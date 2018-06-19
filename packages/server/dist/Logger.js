"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const moment = require("moment");
const pjson = require("pjson");
const winston = require("winston");
const uuid_1 = require("uuid");
const Session_1 = require("./services/Session");
const typescript_ioc_1 = require("typescript-ioc");
class Logger {
    constructor() {
        this.logLevel = "DEBUG";
        this.levels = { CRITICAL: 0, ERROR: 1, WARNING: 2, INFO: 3, DEBUG: 4 };
        this.colors = {
            CRITICAL: "magenta",
            ERROR: "red",
            WARNING: "yellow",
            INFO: "cyan",
            DEBUG: "gray",
        };
        this.securityLevels = [
            "SECURITY_HIGH",
            "SECURITY_MEDIUM",
            "SECURITY_LOW",
        ];
        this.sessionService = typescript_ioc_1.Container.get(Session_1.default);
        this.trackingUuid = uuid_1.v4();
        this.meta = {};
        this.transports = {
            console: new winston.transports.Console({}),
        };
        this.logger = winston.createLogger({
            level: this.logLevel,
            levels: this.levels,
            transports: [this.transports.console],
        });
        winston.addColors(this.colors);
    }
    set $log_level(level) {
        const _levels = Object.keys(this.levels);
        assert(_levels.includes(level), `$log_level MUST string of type ${this.levels}`);
        this.logLevel = level;
        this.transports.console.level = this.logLevel;
    }
    log(level, code, message, securityLevel = "SECURITY_HIGH", requestId, module) {
        const _levels = Object.keys(this.levels);
        const _securtiyLevels = this.securityLevels;
        assert.ok(_levels.includes(level), `@param {string} level - "${_levels.join("|")}"`);
        assert.ok(message.message, `must pass message with the [key 'message'] : [value: Object]`);
        assert.ok(_securtiyLevels.includes(securityLevel), `@param {string} security - "${_securtiyLevels.join("|")}"`);
        const user = this.sessionService.$getUser;
        const _message = {};
        _message.user = user;
        _message.code = code;
        _message.epoch_ms = Date.now();
        _message.message = message;
        _message.version = pjson.version;
        _message.module = module || null;
        _message.role_id = this.serviceName;
        _message.request_id = requestId || null;
        _message.severity = level;
        _message.security = securityLevel;
        _message.timestamp = moment(new Date()).format("Y-m-dTH:M:SZ");
        _message.tracking_uuid = this.trackingUuid;
        this.logger.log(level, JSON.stringify(_message), this.meta);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map