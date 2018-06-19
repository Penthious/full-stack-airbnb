import * as assert from "assert";
import * as pjson from "pjson";
import * as process from "process";
import { config } from "dotenv";
import { Container, Singleton } from "typescript-ioc";

import Logger from "./Logger";

const logger: Logger = Container.get(Logger);
const dotenvPath = `${__dirname}/../.env-${process.env.NODE_ENV}`;
config({ path: `${dotenvPath}` });

@Singleton
export default class GraphqlServerConfig {
  private APP_VERSION: string;
  private CORS_ORIGIN: string;
  private DATABASE_HOST: string;
  private DATABASE_NAME: string;
  private DATABASE_PASSWORD: string;
  private DATABASE_PORT: number;
  private DATABASE_USERNAME: string;
  private ENV: string;
  private EXPRESS_APP_PORT: number;
  private EXPRESS_APP_URL: string;
  private FRONTEND_HOST: string;
  private SERVICE_NAME: string;
  private SESSION_SECRET: string;
  private SPARKPOST_API_KEY: string;
  private TWITTER_CONSUMER_KEY: string;
  private TWITTER_CONSUMER_SECRET: string;

  constructor() {
    this.APP_VERSION = pjson.version;

    // MUST check NODE_ENV first
    assert(
      process.env.NODE_ENV as string,
      `No environmental variable with key "NODE_ENV" is set."`,
    );
    this.ENV = process.env.NODE_ENV as string;

    assert(
      process.env.CORS_ORIGIN,
      `No environmental variable with key "CORS_ORIGIN" is set."`,
    );
    this.CORS_ORIGIN = process.env.CORS_ORIGIN as string;

    assert(
      process.env.DATABASE_HOST,
      `No environmental variable with key "DATABASE_HOST" is set."`,
    );
    this.DATABASE_HOST = process.env.DATABASE_HOST as string;

    assert(
      process.env.DATABASE_NAME,
      `No environmental variable with key "DATABASE_NAME" is set."`,
    );
    this.DATABASE_NAME = process.env.DATABASE_NAME as string;

    assert(
      process.env.DATABASE_PASSWORD,
      `No environmental variable with key "DATABASE_PASSWORD" is set."`,
    );
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

    assert(
      process.env.DATABASE_PORT,
      `No environmental variable with key "DATABASE_PORT" is set."`,
    );
    this.DATABASE_PORT = parseInt(process.env.DATABASE_PORT as string, 10);

    assert(
      process.env.DATABASE_USERNAME,
      `No environmental variable with key "DATABASE_USERNAME" is set."`,
    );
    this.DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;

    // assert(
    //   process.env.LOG_LEVEL,
    //   `No environmental variable with key "LOG_LEVEL" is set."`,
    // );
    // this.log_level = process.env.LOG_LEVEL as string;

    assert(
      process.env.EXPRESS_APP_PORT,
      `No environmental variable with key "EXPRESS_APP_PORT" is set."`,
    );
    this.EXPRESS_APP_PORT = parseInt(
      process.env.EXPRESS_APP_PORT as string,
      10,
    );
    assert(
      process.env.EXPRESS_APP_URL,
      `No environmental variable with key "EXPRESS_APP_URL" is set."`,
    );
    this.EXPRESS_APP_URL = process.env.EXPRESS_APP_PORT as string;

    assert(
      process.env.FRONTEND_HOST,
      `No environmental variable with key "FRONTEND_HOST" is set."`,
    );
    this.FRONTEND_HOST = process.env.FRONTEND_HOST as string;

    assert(
      process.env.SERVICE_NAME,
      `No environmental variable with key "SERVICE_NAME" is set."`,
    );
    this.SERVICE_NAME = process.env.SERVICE_NAME as string;

    assert(
      process.env.SESSION_SECRET,
      `No environmental variable with key "SESSION_SECRET" is set."`,
    );
    this.SESSION_SECRET = process.env.SESSION_SECRET as string;

    assert(
      process.env.SPARKPOST_API_KEY,
      `No environmental variable with key "SPARKPOST_API_KEY" is set."`,
    );
    this.SPARKPOST_API_KEY = process.env.SPARKPOST_API_KEY as string;

    assert(
      process.env.TWITTER_CONSUMER_KEY,
      `No environmental variable with key "TWITTER_CONSUMER_KEY" is set."`,
    );
    this.TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY as string;

    assert(
      process.env.TWITTER_CONSUMER_SECRET,
      `No environmental variable with key "TWITTER_CONSUMER_SECRET" is set."`,
    );
    this.TWITTER_CONSUMER_SECRET = process.env
      .TWITTER_CONSUMER_SECRET as string;

    // this.logger.logLevel = this.$log_level;

    logger.log("INFO", "CONFIG", {
      message: "graphql-server-configuration",
      config: {
        app_version: this.APP_VERSION,
        cors_origin: this.CORS_ORIGIN,
        database_host: this.DATABASE_HOST,
        database_name: this.DATABASE_NAME,
        database_password: this.DATABASE_PASSWORD,
        database_port: this.DATABASE_PORT,
        database_username: this.DATABASE_USERNAME,
        env: this.ENV,
        // log_level: this.log_level,
        service_name: this.SERVICE_NAME,
        frontend_host: this.FRONTEND_HOST,
      },
    });
  }

  public get $app_version(): string {
    return this.APP_VERSION;
  }

  public get $cors_origin(): string {
    return this.CORS_ORIGIN;
  }

  public get $database_host(): string {
    return this.DATABASE_HOST;
  }

  public get $database_name(): string {
    return this.DATABASE_NAME;
  }

  public get $database_password(): string {
    return this.DATABASE_PASSWORD;
  }

  public get $database_port(): number {
    return this.DATABASE_PORT;
  }

  public get $database_username(): string {
    return this.DATABASE_USERNAME;
  }

  public get $env(): string {
    return this.ENV;
  }

  public get $express_app_port(): number {
    return this.EXPRESS_APP_PORT;
  }

  public get $express_app_url(): string {
    return this.EXPRESS_APP_URL;
  }

  public get $frontend_host(): string {
    return this.FRONTEND_HOST;
  }

  public get $service_name(): string {
    return this.SERVICE_NAME;
  }

  public get $session_secret(): string {
    return this.SESSION_SECRET;
  }

  public get $sparkpost_api_key(): string {
    return this.SPARKPOST_API_KEY;
  }

  public get $twitter_consumer_key(): string {
    return this.TWITTER_CONSUMER_KEY;
  }

  public get $twitter_consumer_secret(): string {
    return this.TWITTER_CONSUMER_SECRET;
  }
}
