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
const node_fetch_1 = require("node-fetch");
const typescript_ioc_1 = require("typescript-ioc");
const App_1 = require("../App");
const testCLient_1 = require("../testSetup/testCLient");
const createConfirmEmailLink_1 = require("./createConfirmEmailLink");
const User_1 = require("../entity/User");
const client = typescript_ioc_1.Container.get(testCLient_1.default);
const app = typescript_ioc_1.Container.get(App_1.default);
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.createConn();
    const user = yield client.createUser();
    this.userId = user.id;
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.stop();
}));
describe("Email link", () => {
    test("Make sure it confirms user and clears key in redis", () => __awaiter(this, void 0, void 0, function* () {
        const url = yield createConfirmEmailLink_1.createConfirmEmailLink(client.url, this.userId, app.redis);
        const response = yield node_fetch_1.default(url);
        const text = yield response.text();
        expect(text).toEqual("ok");
        const user = (yield User_1.User.findOne({ where: { id: this.userId } }));
        expect(user.confirmed).toBeTruthy();
        const key = url.split("/").pop();
        const value = yield app.redis.get(key);
        expect(value).toBeNull();
    }));
    test("Sends invalid back if bad id sent", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(`${client.url}/confirm/fake_id`);
        const text = yield response.text();
        expect(text).toEqual("invalid");
    }));
});
//# sourceMappingURL=createConfirmEmailLink.test.js.map