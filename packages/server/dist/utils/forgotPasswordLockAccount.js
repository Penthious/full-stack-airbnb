"use strict";
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
const Session_1 = require("../services/Session");
const User_1 = require("../entity/User");
const sessionService = typescript_ioc_1.Container.get(Session_1.default);
exports.forgotPasswordLockAccount = (userId, redis) => __awaiter(this, void 0, void 0, function* () {
    yield User_1.User.update({ id: userId }, { accountLocked: true });
    sessionService.removeAllUserSessions(userId, redis);
});
//# sourceMappingURL=forgotPasswordLockAccount.js.map