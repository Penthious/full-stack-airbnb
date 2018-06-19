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
const App_1 = require("../../../App");
const testCLient_1 = require("../../../testSetup/testCLient");
const app = typescript_ioc_1.Container.get(App_1.default);
const client = typescript_ioc_1.Container.get(testCLient_1.default);
const email = "tom@bob.com";
const password = "aoeuaoeuaoeu";
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.createConn();
    this.user = yield client.createUser();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.stop();
}));
describe("me", () => {
    test("Can not get user if not logged in", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield client.me();
        expect(response.data.me).toBeNull();
        expect(response.errors[0]).toHaveProperty("message");
    }));
    test("Can get current user", () => __awaiter(this, void 0, void 0, function* () {
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                id: this.user.id,
                email: this.user.email,
            },
        });
    }));
});
//# sourceMappingURL=me.test.js.map