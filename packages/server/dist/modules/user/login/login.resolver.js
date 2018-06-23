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
const bcryptjs_1 = require("bcryptjs");
const typescript_ioc_1 = require("typescript-ioc");
const Session_1 = require("../../../services/Session");
const UserService_1 = require("../../../services/UserService");
const errorMessages_1 = require("./errorMessages");
const constants_1 = require("../../../utils/constants");
let Login = class Login {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.resolvers = {
            Mutation: {
                login: (_, args, context) => this._login(_, args, context),
            },
        };
    }
    _login(_, { email, password }, { redis, request, session }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({ email });
            if (!user || !(yield bcryptjs_1.compare(password, user.password))) {
                return [
                    {
                        path: "email/password",
                        message: errorMessages_1.invalidLogin,
                    },
                ];
            }
            if (!user.confirmed) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.confirmEmailError,
                    },
                ];
            }
            if (user.accountLocked) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.accountLocked,
                    },
                ];
            }
            session.userId = user.id;
            this.sessionService.$setUser = user;
            if (request.sessionID) {
                yield redis.lpush(`${constants_1.USER_SESSION_ID_PREFIX}${user.id}`, request.sessionID);
            }
            return null;
        });
    }
};
Login = __decorate([
    typescript_ioc_1.Singleton,
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [UserService_1.default,
        Session_1.default])
], Login);
exports.default = Login;
