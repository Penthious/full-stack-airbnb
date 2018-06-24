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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const pjson = require("pjson");
const process = require("process");
const dotenv_1 = require("dotenv");
const typescript_ioc_1 = require("typescript-ioc");
const Logger_1 = require("./Logger");
const logger = typescript_ioc_1.Container.get(Logger_1.default);
const dotenvPath = `${__dirname}/../.env-${process.env.NODE_ENV}`;
dotenv_1.config({ path: `${dotenvPath}` });
let GraphqlServerConfig = class GraphqlServerConfig {
    constructor() {
        this.APP_VERSION = pjson.version;
        assert(process.env.NODE_ENV, `No environmental variable with key "NODE_ENV" is set."`);
        this.ENV = process.env.NODE_ENV;
        assert(process.env.CORS_ORIGIN, `No environmental variable with key "CORS_ORIGIN" is set."`);
        this.CORS_ORIGIN = process.env.CORS_ORIGIN;
        assert(process.env.DATABASE_HOST, `No environmental variable with key "DATABASE_HOST" is set."`);
        this.DATABASE_HOST = process.env.DATABASE_HOST;
        assert(process.env.DATABASE_NAME, `No environmental variable with key "DATABASE_NAME" is set."`);
        this.DATABASE_NAME = process.env.DATABASE_NAME;
        assert(process.env.DATABASE_PASSWORD, `No environmental variable with key "DATABASE_PASSWORD" is set."`);
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
        assert(process.env.DATABASE_PORT, `No environmental variable with key "DATABASE_PORT" is set."`);
        this.DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10);
        assert(process.env.DATABASE_USERNAME, `No environmental variable with key "DATABASE_USERNAME" is set."`);
        this.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
        assert(process.env.EXPRESS_APP_PORT, `No environmental variable with key "EXPRESS_APP_PORT" is set."`);
        this.EXPRESS_APP_PORT = parseInt(process.env.EXPRESS_APP_PORT, 10);
        assert(process.env.EXPRESS_APP_URL, `No environmental variable with key "EXPRESS_APP_URL" is set."`);
        this.EXPRESS_APP_URL = process.env.EXPRESS_APP_PORT;
        assert(process.env.FRONTEND_HOST, `No environmental variable with key "FRONTEND_HOST" is set."`);
        this.FRONTEND_HOST = process.env.FRONTEND_HOST;
        assert(process.env.SERVICE_NAME, `No environmental variable with key "SERVICE_NAME" is set."`);
        this.SERVICE_NAME = process.env.SERVICE_NAME;
        assert(process.env.SESSION_SECRET, `No environmental variable with key "SESSION_SECRET" is set."`);
        this.SESSION_SECRET = process.env.SESSION_SECRET;
        assert(process.env.SPARKPOST_API_KEY, `No environmental variable with key "SPARKPOST_API_KEY" is set."`);
        this.SPARKPOST_API_KEY = process.env.SPARKPOST_API_KEY;
        assert(process.env.TWITTER_CONSUMER_KEY, `No environmental variable with key "TWITTER_CONSUMER_KEY" is set."`);
        this.TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
        assert(process.env.TWITTER_CONSUMER_SECRET, `No environmental variable with key "TWITTER_CONSUMER_SECRET" is set."`);
        this.TWITTER_CONSUMER_SECRET = process.env
            .TWITTER_CONSUMER_SECRET;
        this.REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined;
        this.REDIS_HOST = process.env.REDIS_HOST;
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
                service_name: this.SERVICE_NAME,
                frontend_host: this.FRONTEND_HOST,
            },
        });
    }
    get $app_version() {
        return this.APP_VERSION;
    }
    get $cors_origin() {
        return this.CORS_ORIGIN;
    }
    get $database_host() {
        return this.DATABASE_HOST;
    }
    get $database_name() {
        return this.DATABASE_NAME;
    }
    get $database_password() {
        return this.DATABASE_PASSWORD;
    }
    get $database_port() {
        return this.DATABASE_PORT;
    }
    get $database_username() {
        return this.DATABASE_USERNAME;
    }
    get $env() {
        return this.ENV;
    }
    get $express_app_port() {
        return this.EXPRESS_APP_PORT;
    }
    get $express_app_url() {
        return this.EXPRESS_APP_URL;
    }
    get $frontend_host() {
        return this.FRONTEND_HOST;
    }
    get $service_name() {
        return this.SERVICE_NAME;
    }
    get $session_secret() {
        return this.SESSION_SECRET;
    }
    get $sparkpost_api_key() {
        return this.SPARKPOST_API_KEY;
    }
    get $twitter_consumer_key() {
        return this.TWITTER_CONSUMER_KEY;
    }
    get $twitter_consumer_secret() {
        return this.TWITTER_CONSUMER_SECRET;
    }
    get $redis_port() {
        return this.REDIS_PORT;
    }
    get $redis_host() {
        return this.REDIS_HOST;
    }
};
GraphqlServerConfig = __decorate([
    typescript_ioc_1.Singleton,
    __metadata("design:paramtypes", [])
], GraphqlServerConfig);
exports.default = GraphqlServerConfig;
