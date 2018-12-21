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
const typescript_ioc_1 = require("typescript-ioc");
const Session_1 = require("../../../services/Session");
let Logout = class Logout {
    constructor(sessionService) {
        this.sessionService = sessionService;
        this.resolvers = {
            Mutation: {
                logout: (_, args, context) => this._logout(_, args, context),
            },
        };
    }
    _logout(_, { multi }, { request, session, redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = session;
            if (userId && multi) {
                console.log("test");
                yield this.sessionService.removeAllUserSessions(userId, redis);
            }
            else if (userId && !multi) {
                yield this.sessionService.removeSingleSession(request.sessionID, redis);
            }
            return null;
        });
    }
};
Logout = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [Session_1.default])
], Logout);
exports.default = Logout;
