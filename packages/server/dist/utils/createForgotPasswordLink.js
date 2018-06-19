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
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
exports.createForgotPasswordLink = (url, userId, redis) => __awaiter(this, void 0, void 0, function* () {
    const id = uuid_1.v4();
    yield exports.storeLinkToRedis(id, userId, redis);
    return `${url}/change-password/${id}`;
});
exports.storeLinkToRedis = (id, userId, redis) => {
    const twentyMinutes = 60 * 20;
    return redis.set(`${constants_1.FORGOT_PASSWORD_PREFIX}${id}`, userId, "ex", twentyMinutes);
};
//# sourceMappingURL=createForgotPasswordLink.js.map