import * as assert from "assert";
import * as moment from "moment";
import * as pjson from "pjson";
import * as winston from "winston";
import { v4 } from "uuid";

import SessionService from "./services/Session";
import { User } from "./entity/User";
import { Container } from "typescript-ioc";

export default class Logger {
  /* Determines What level < to output.
   * @prop {String}
   */
  public logLevel: string = "DEBUG";

  /* The apps service name  e.g. graphql-server-[test|dev|prod]
   * @param {string} - serviceName.
   */
  public serviceName: string;

  /* currentUser company_id;
   * @param {number} - request_id.
   */
  public organizationId: number;

  /* Value of X-Request-Id. This is defined by the load balancer
   * @prop {string} - request_id.
   */
  public requestId: number;

  /* Logging levels as defined by the StandardizedLogger
   * https://s3-us-west-2.amazonaws.com/teem-docs/libender/logs/adapters.html
   * @priv {(key:string, value: number)} - levels
   */
  private levels = { CRITICAL: 0, ERROR: 1, WARNING: 2, INFO: 3, DEBUG: 4 };

  /* Logging output colors by level.
   * npm Colos is used by winston for which colors are avaiable.
   * @priv {(key:string, value: string)} - colors
   */
  private colors = {
    CRITICAL: "magenta",
    ERROR: "red",
    WARNING: "yellow",
    INFO: "cyan",
    DEBUG: "gray",
  };

  /* Winson Logger instance.
   * The Logger class is a wrapper around Winston.
   * https://github.com/winstonjs
   * @priv {Winston.Logger}
   */
  private logger: winston.Logger;

  /* reserved prop for Winston logger meta property if we wish to use it in future.
   * @priv {meta}
   */
  private meta: any;

  /* Dictates who has access to the log messages.
   * https://s3-us-west-2.amazonaws.com/teem-docs/libender/logs/adapters.html
   * @priv [{Stirng}] - security_levels
   */
  private securityLevels: string[] = [
    "SECURITY_HIGH",
    "SECURITY_MEDIUM",
    "SECURITY_LOW",
  ];

  private sessionService: SessionService = Container.get(SessionService);

  //   private _type: string = "graphql_server.Logger";

  private trackingUuid: string = v4();

  private transports: any;

  /* Create new instance of Logger Class
   * @param {String} log_level - the minimum level to emit log message.
   * @return VOID
   */
  private constructor() {
    this.meta = {};

    this.transports = {
      console: new winston.transports.Console({}),
      // file: new winston.transports.File({ filename: 'somefile.log' }),
      // console: new winston.transports.Console({ colorize: false, stringify: true, showLevel: false, }),
    };

    this.logger = winston.createLogger({
      level: this.logLevel,
      levels: this.levels,
      transports: [this.transports.console],
    });

    winston.addColors(this.colors);
  }

  public set $log_level(level: string) {
    const _levels = Object.keys(this.levels);
    assert(
      _levels.includes(level),
      `$log_level MUST string of type ${this.levels}`,
    );

    this.logLevel = level;
    this.transports.console.level = this.logLevel;
  }

  /* log method which will include user meta and merge additional properties.
   * @param {string} level - this.level.
   * @param {Object} - message must include message
   * @properties {*} message - human readable log message.
   * @param {}
   * @param {Object} - meta
   * @param {Object} meta - metadata to be passed in log.
  */
  public log(
    level: string,
    code: string,
    message: any,
    securityLevel: string = "SECURITY_HIGH",
    requestId?: string,
    module?: string,
  ) {
    const _levels = Object.keys(this.levels);
    const _securtiyLevels = this.securityLevels;

    assert.ok(
      _levels.includes(level),
      `@param {string} level - "${_levels.join("|")}"`,
    );
    assert.ok(
      message.message,
      `must pass message with the [key 'message'] : [value: Object]`,
    );
    assert.ok(
      _securtiyLevels.includes(securityLevel),
      `@param {string} security - "${_securtiyLevels.join("|")}"`,
    );

    const user: User | undefined = this.sessionService.$getUser;
    const _message: any = {};

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
