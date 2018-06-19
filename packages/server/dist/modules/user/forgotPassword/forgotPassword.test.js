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
const errorMessages_1 = require("../login/errorMessages");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const errorMessages_2 = require("./errorMessages");
const forgotPasswordLockAccount_1 = require("../../../utils/forgotPasswordLockAccount");
const errorMessages_3 = require("../register/errorMessages");
const app = typescript_ioc_1.Container.get(App_1.default);
const client = typescript_ioc_1.Container.get(testCLient_1.default);
const newPassword = "myNewPasswordi";
const password = "password";
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.createConn();
    this.user = yield client.createUser(null, password);
    yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(this.user.id, app.redis);
    const url = yield createForgotPasswordLink_1.createForgotPasswordLink("", this.user.id, app.redis);
    const parts = url.split("/");
    this.key = parts[parts.length - 1];
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.stop();
}));
describe("forgot password", () => {
    test("Password is to short", () => __awaiter(this, void 0, void 0, function* () {
        expect(yield client.forgotPasswordUpdate("a", this.key)).toEqual({
            data: {
                forgotPasswordUpdate: [
                    { path: "newPassword", message: errorMessages_3.passwordNotLongEnough },
                ],
            },
        });
    }));
    test("Can change users password", () => __awaiter(this, void 0, void 0, function* () {
        expect(yield client.login(this.user.email, password)).toEqual({
            data: {
                login: [{ path: "email", message: errorMessages_1.accountLocked }],
            },
        });
        const response = yield client.forgotPasswordUpdate(newPassword, this.key);
        console.log(response);
        expect(response.data).toEqual({
            forgotPasswordUpdate: null,
        });
        expect(yield client.login(this.user.email, newPassword)).toEqual({
            data: {
                login: null,
            },
        });
        expect(yield client.me()).toEqual({
            data: {
                me: {
                    id: this.user.id,
                    email: this.user.email,
                },
            },
        });
    }));
    test("Key expires after single use", () => __awaiter(this, void 0, void 0, function* () {
        expect(yield client.forgotPasswordUpdate(this.user.email, this.key)).toEqual({
            data: {
                forgotPasswordUpdate: [{ path: "key", message: errorMessages_2.expiredKeyError }],
            },
        });
    }));
});
//# sourceMappingURL=forgotPassword.test.js.map