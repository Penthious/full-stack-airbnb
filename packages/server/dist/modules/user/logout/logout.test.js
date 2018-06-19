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
const client2 = typescript_ioc_1.Container.get(testCLient_1.default);
const client = typescript_ioc_1.Container.get(testCLient_1.default);
const email = "tom@bob.com";
const password = "aoeuaoeuaoeu";
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.createConn();
    yield client.createUser(email, password);
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.stop();
}));
describe("multiple sessions", () => {
    test.skip("Logout across all open sessions", () => __awaiter(this, void 0, void 0, function* () {
        yield client.login(email, password);
        yield client2.login(email, password);
        expect(yield client.me()).toEqual(yield client2.me());
        yield client.logout(true);
        expect(yield client.me()).toEqual(yield client2.me());
    }));
});
describe("single session", () => {
    test("Can logout current user", () => __awaiter(this, void 0, void 0, function* () {
        const data = yield client.login(email, password);
        console.log(data.data.login);
        const response = yield client.me();
        expect(response.data.me).toBeTruthy();
        yield client.logout(false);
        const response2 = yield client.me();
        expect(response2.data.me).toBeNull();
    }));
});
//# sourceMappingURL=logout.test.js.map