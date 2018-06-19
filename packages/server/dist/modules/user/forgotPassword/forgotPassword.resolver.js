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
const yup = require("yup");
const typescript_ioc_1 = require("typescript-ioc");
const UserService_1 = require("../../../services/UserService");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const errorMessages_1 = require("./errorMessages");
const constants_1 = require("../../../utils/constants");
const forgotPasswordLockAccount_1 = require("../../../utils/forgotPasswordLockAccount");
const formatYupError_1 = require("../../../utils/formatYupError");
const yupSchemas_1 = require("../../../utils/yupSchemas");
let ForgotPassword = class ForgotPassword {
    constructor(userService) {
        this.userService = userService;
        this.resolvers = {
            Mutation: {
                forgotPasswordUpdate: (_, args, context) => this._forgotPasswordUpdate(_, args, context),
                sendForgotPasswordEmail: (_, args, context) => this._sendForgotPasswordEmail(_, args, context),
            },
        };
        this.schema = yup.object().shape({
            newPassword: yupSchemas_1.passwordValidation,
            key: yupSchemas_1.newPasswordKeyValidation,
        });
    }
    _forgotPasswordUpdate(_, { newPassword, key }, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.schema.validate({ newPassword, key }, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const userId = yield redis.get(`${constants_1.FORGOT_PASSWORD_PREFIX}${key}`);
            if (!userId) {
                return [
                    {
                        path: "key",
                        message: errorMessages_1.expiredKeyError,
                    },
                ];
            }
            yield redis.del(`${constants_1.FORGOT_PASSWORD_PREFIX}${key}`);
            yield this.userService.update(userId, {
                password: newPassword,
                accountLocked: false,
            });
            return null;
        });
    }
    _sendForgotPasswordEmail(_, { email }, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({ email });
            if (user) {
                yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(user.id, redis);
                yield createForgotPasswordLink_1.createForgotPasswordLink("", user.id, redis);
                return true;
            }
            return false;
        });
    }
};
ForgotPassword = __decorate([
    typescript_ioc_1.Singleton,
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [UserService_1.default])
], ForgotPassword);
exports.default = ForgotPassword;
//# sourceMappingURL=forgotPassword.resolver.js.map