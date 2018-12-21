import "reflect-metadata";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedis from "rate-limit-redis";
import * as Redis from "ioredis";
import * as session from "express-session";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { Inject, Singleton, Container } from "typescript-ioc";
import { Connection, createConnection } from "typeorm";
import { GraphQLServer } from "graphql-yoga";

import GraphqlServerConfig from "./Config";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { REDIS_SESSION_PREFIX } from "./utils/constants";
import { twitterPassport } from "./routes/twitterOauth";
import Logger from "./Logger";
import { join } from "path";

@Singleton
export default class App {
  public connectionOptions = this.setupOrmConfigOptions();
  public redis: Redis.Redis;
  public server: GraphQLServer;

  private _name: string = "graphql_server.App";
  private connection: Connection;
  private logger: Logger = Container.get(Logger);
  private redisStore = connectRedis(session);

  constructor(@Inject private graphqlServerConfig: GraphqlServerConfig) {
    if (this.graphqlServerConfig.$env === "production") {
      this.redis = new Redis(process.env.REDIS_URL); // @todo: extract this to config
    } else {
      this.redis = this.graphqlServerConfig.$redis_port
        ? new Redis({
            port: this.graphqlServerConfig.$redis_port,
            host: this.graphqlServerConfig.$redis_host,
          })
        : new Redis();
    }
  }

  /**
   * Creates an instance of express wraped inside graphql-yoga
   * Listens on port 4000
   */
  public async start() {
    const server = this.createApp();
    const options = this.setupConnectionOptions();

    this.logger.log(
      "INFO",
      `${this._name}#start`,
      {
        message: `App has started on port: ${options.port}`,
      },
      "SECURITY_LOW",
    );

    return (await server).start(options);
  }

  /**
   * Wrapper to Terminate the TypeORM Db Connection
   */
  public async stop() {
    this.logger.log(
      "INFO",
      `${this._name}#stop`,
      {
        message: "App connection to database is now being closed",
      },
      "SECURITY_LOW",
    );
    return this.stopConnection();
  }

  /**
   * Sets the settings for orm config thes way we
   * can have a dynamic connection to the database
   * deppending on your .env and NODE_ENV
   */
  public setupOrmConfigOptions() {
    let configData = {
      host: this.graphqlServerConfig.$database_host,
      port: this.graphqlServerConfig.$database_port,
      username: this.graphqlServerConfig.$database_username,
      password: this.graphqlServerConfig.$database_password,
      database: this.graphqlServerConfig.$database_name,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
    };
    if (this.graphqlServerConfig.$env === "production") {
      configData = {
        url: process.env.DATABASE_URL, // @todo: extract this to config
        entities: [join(__dirname, "./entity/**/*.js")],
        migrations: ["./migration/**/*.js"],
        subscribers: ["./subscriber/**/*.js"],
      } as any;
    }
    const config = {
      name: "default",
      type: "postgres",
      synchronize: true,
      ...configData,
      logging: this.graphqlServerConfig.$env !== "test",
      dropSchema: this.graphqlServerConfig.$env === "test",
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
    };

    return config;
  }

  /**
   * Sets up the graphql server default options
   * IE: Cors, port, and endpoints
   */
  public setupConnectionOptions(): {
    cors: { credentials: boolean; origin: string };
    port: number;
    endpoint: string;
    subscriptions: string;
    playground: string;
  } {
    const cors = {
      credentials: true,
      origin: this.graphqlServerConfig.$cors_origin,
    };

    return {
      cors,
      port: this.graphqlServerConfig.$express_app_port,
      endpoint: "/graphql",
      subscriptions: "/subscriptions",
      playground: "/playground",
    };
  }

  /**
   * Creates a connection to our database
   * You can pass your own connection options into
   * here if not then it will default to the one
   * defined above,
   * @param config
   */
  public async createConn(config: any = this.setupOrmConfigOptions()) {
    try {
      this.connection = await createConnection(config);

      return this.connection;
    } catch (error) {
      this.logger.log(
        "ERROR",
        `${this._name}#createConn`,
        {
          message:
            "There seems to have been an issue connecting to the database maby check your CONFIG",
          config,
          error: error.message,
        },
        "SECURITY_HIGH",
      );
      throw new Error(error);
    }
  }

  /**
   * Creates the graphql server
   */
  private createServer() {
    try {
      this.server = new GraphQLServer({
        schema: genSchema() as any,
        context: ({ request }) => ({
          request,
          redis: this.redis,
          session: request.session,
          url: `${request.protocol}://${request.get("host")}`,
        }),
      });
    } catch (error) {
      this.logger.log(
        "ERROR",
        `${this._name}#createServer`,
        {
          message: "There seems to have been an issue creating the server",
          error: error.message,
        },
        "SECURITY_HIGH",
      );
      throw new Error(error);
    }
  }

  /**
   * Sets up the rate limit for our site
   * so that users can not spam our endpoints
   */
  private setupRateLimit() {
    if (this.graphqlServerConfig.$env !== "production") {
      return;
    }
    this.server.express.use(
      new RateLimit({
        store: new RateLimitRedis({
          client: this.redis,
        }),
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // requests
        delayMs: 0,
      }),
    );
  }

  /**
   * Sets up our session so that we can have access
   * to cookies and our user
   */
  private setupSession() {
    this.server.express.use(
      session({
        store: new this.redisStore({
          client: this.redis as any,
          prefix: REDIS_SESSION_PREFIX,
        }),
        name: "qid",
        secret: this.graphqlServerConfig.$session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: this.graphqlServerConfig.$env === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
      }),
    );
  }

  /**
   * Sets up morgan a endpoint logger to see what endpoints
   * users are hitting, in this case we are using it to
   * log out the mutiations and queries users and doing
   * along with the values
   */
  private setupMorgan() {
    if (this.graphqlServerConfig.$env === "test") {
      return;
    }
    morgan.token("graphql-query", (req: any) => {
      const { query, variables, operationName } = req.body;
      return `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(
        variables,
      )}`;
    });
    this.server.express.use(bodyParser.json());
    this.server.express.use(morgan(":graphql-query"));
  }

  /**
   * Sets up our static routes that are being used
   * from express, this is not our graphql endpoints
   * but the routes to login through Oauth or forgot password
   */
  private setupRoutes() {
    // Setups forgot password route
    this.server.express.get("/confirm/:id", confirmEmail);
    // Setups twitter routes
    this.server.express.use(twitterPassport(this.server).initialize());
  }

  /**
   * Creates our express/graphql app
   */
  private async createApp() {
    try {
      await this.createConn(this.connectionOptions);

      this.createServer();

      this.setupRateLimit();

      this.setupSession();

      this.setupMorgan();

      this.setupRoutes();

      return this.server;
    } catch (error) {
      this.logger.log(
        "ERROR",
        `${this._name}#createApp`,
        {
          message: "There seems to have been a issue starting the app",
          error: error.message,
        },
        "SECURITY_HIGH",
      );

      throw new Error(error);
    }
  }

  /**
   * Terminate the TypeORM Db Connection
   */
  private async stopConnection() {
    await this.connection.close();
    await this.redis.quit();

    return this.connection;
  }
}
