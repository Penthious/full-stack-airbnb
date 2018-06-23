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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const constants_1 = require("../utils/constants");
let SessionService = class SessionService {
    constructor() {
        this.removeAllUserSessions = (userId, redis) => __awaiter(this, void 0, void 0, function* () {
            this._currentUser = undefined;
            const sessionIds = yield redis.lrange(`${constants_1.USER_SESSION_ID_PREFIX}${userId}`, 0, -1);
            sessionIds.forEach((id) => __awaiter(this, void 0, void 0, function* () { return redis.del(`${constants_1.REDIS_SESSION_PREFIX}${id}`); }));
        });
    }
    set $setUser(user) {
        this._currentUser = user;
    }
    get $getUser() {
        if (this._currentUser) {
            return this._currentUser;
        }
        return undefined;
    }
    removeSingleSession(sessionId, redis) {
        return __awaiter(this, void 0, void 0, function* () {
            this._currentUser = undefined;
            redis.del(`${constants_1.REDIS_SESSION_PREFIX}${sessionId}`);
        });
    }
};
SessionService = __decorate([
    typescript_ioc_1.Singleton,
    __metadata("design:paramtypes", [])
], SessionService);
exports.default = SessionService;
