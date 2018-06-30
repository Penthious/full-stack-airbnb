"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectRedis = require("connect-redis");
const RateLimit = require("express-rate-limit");
const RateLimitRedis = require("rate-limit-redis");
const Redis = require("ioredis");
const session = require("express-session");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const typescript_ioc_1 = require("typescript-ioc");
const typeorm_1 = require("typeorm");
const graphql_yoga_1 = require("graphql-yoga");
const Config_1 = require("./Config");
const confirmEmail_1 = require("./routes/confirmEmail");
const genSchema_1 = require("./utils/genSchema");
const constants_1 = require("./utils/constants");
const twitterOauth_1 = require("./routes/twitterOauth");
const Logger_1 = require("./Logger");
const path_1 = require("path");
let App = class App {
    constructor(graphqlServerConfig) {
        this.graphqlServerConfig = graphqlServerConfig;
        this.connectionOptions = this.setupOrmConfigOptions();
        this._name = "graphql_server.App";
        this.logger = typescript_ioc_1.Container.get(Logger_1.default);
        this.redisStore = connectRedis(session);
        if (this.graphqlServerConfig.$env === 'production') {
            this.redis = new Redis(process.env.REDIS_URL);
        }
        else {
            this.redis = this.graphqlServerConfig.$redis_port ? new Redis({
                port: this.graphqlServerConfig.$redis_port, host: this.graphqlServerConfig.$redis_host
            }) : new Redis();
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = this.createApp();
            const options = this.setupConnectionOptions();
            this.logger.log("INFO", `${this._name}#start`, {
                message: `App has started on port: ${options.port}`,
            }, "SECURITY_LOW");
            return (yield server).start(options);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("INFO", `${this._name}#stop`, {
                message: "App connection to database is now being closed",
            }, "SECURITY_LOW");
            return this.stopConnection();
        });
    }
    setupOrmConfigOptions() {
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
        if (this.graphqlServerConfig.$env === 'production') {
            configData = {
                url: process.env.DATABASE_URL,
                entities: [path_1.join(__dirname, './entity/**/*.js')],
                migrations: ["./migration/**/*.js"],
                subscribers: ["./subscriber/**/*.js"],
            };
        }
        const config = Object.assign({ name: "default", type: "postgres", synchronize: true }, configData, { logging: this.graphqlServerConfig.$env !== "test", dropSchema: this.graphqlServerConfig.$env === "test", cli: {
                entitiesDir: "src/entity",
                migrationsDir: "src/migration",
                subscribersDir: "src/subscriber",
            } });
        return config;
    }
    setupConnectionOptions() {
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
    createConn(config = this.setupOrmConfigOptions()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield typeorm_1.createConnection(config);
                return this.connection;
            }
            catch (error) {
                this.logger.log("ERROR", `${this._name}#createConn`, {
                    message: "There seems to have been an issue connecting to the database maby check your CONFIG",
                    config,
                    error: error.message,
                }, "SECURITY_HIGH");
                throw new Error(error);
            }
        });
    }
    createServer() {
        try {
            this.server = new graphql_yoga_1.GraphQLServer({
                schema: genSchema_1.genSchema(),
                context: ({ request }) => ({
                    request,
                    redis: this.redis,
                    session: request.session,
                    url: `${request.protocol}://${request.get("host")}`,
                }),
            });
        }
        catch (error) {
            this.logger.log("ERROR", `${this._name}#createServer`, {
                message: "There seems to have been an issue creating the server",
                error: error.message,
            }, "SECURITY_HIGH");
            throw new Error(error);
        }
    }
    setupRateLimit() {
        if (this.graphqlServerConfig.$env !== "production") {
            return;
        }
        this.server.express.use(new RateLimit({
            store: new RateLimitRedis({
                client: this.redis,
            }),
            windowMs: 15 * 60 * 1000,
            max: 100,
            delayMs: 0,
        }));
    }
    setupSession() {
        this.server.express.use(session({
            store: new this.redisStore({
                client: this.redis,
                prefix: constants_1.REDIS_SESSION_PREFIX,
            }),
            name: "qid",
            secret: this.graphqlServerConfig.$session_secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: this.graphqlServerConfig.$env === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        }));
    }
    setupMorgan() {
        if (this.graphqlServerConfig.$env === "test") {
            return;
        }
        morgan.token("graphql-query", (req) => {
            const { query, variables, operationName } = req.body;
            return `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(variables)}`;
        });
        this.server.express.use(bodyParser.json());
        this.server.express.use(morgan(":graphql-query"));
    }
    setupRoutes() {
        this.server.express.get("/confirm/:id", confirmEmail_1.confirmEmail);
        this.server.express.use(twitterOauth_1.twitterPassport(this.server).initialize());
    }
    createApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.createConn(this.connectionOptions);
                this.createServer();
                this.setupRateLimit();
                this.setupSession();
                this.setupMorgan();
                this.setupRoutes();
                return this.server;
            }
            catch (error) {
                this.logger.log("ERROR", `${this._name}#createApp`, {
                    message: "There seems to have been a issue starting the app",
                    error: error.message,
                }, "SECURITY_HIGH");
                throw new Error(error);
            }
        });
    }
    stopConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.close();
            yield this.redis.quit();
            return this.connection;
        });
    }
};
App = __decorate([
    typescript_ioc_1.Singleton,
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [Config_1.default])
], App);
exports.default = App;
