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
const App_1 = require("../App");
const User_1 = require("../entity/User");
exports.confirmEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const app = typescript_ioc_1.Container.get(App_1.default);
    const { id } = req.params;
    const userId = yield app.redis.get(id);
    if (userId) {
        yield User_1.User.update({ id: userId }, { confirmed: true });
        yield app.redis.del(id);
        res.send("ok");
    }
    else {
        res.send("invalid");
    }
});
