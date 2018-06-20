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
const errorMessages_1 = require("./errorMessages");
const User_1 = require("../../../entity/User");
const client = typescript_ioc_1.Container.get(testCLient_1.default);
const app = typescript_ioc_1.Container.get(App_1.default);
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.createConn();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.stop();
}));
describe("Register", () => {
    const email = "tom@bob.com";
    const password = "aoeuaoeuaoeu";
    test("Register user", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield client.register(email, password);
        expect(response.data).toEqual({ register: null });
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
    }));
    test("Register a user with the same email", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.register(email, password));
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        expect(response.data.register[0]).toEqual({
            path: "email",
            message: errorMessages_1.duplicateEmail,
        });
    }));
    test("Catch non emails", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.register("bad", password));
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        expect(response.data.register[0]).toEqual({
            path: "email",
            message: errorMessages_1.invalidEmail,
        });
    }));
    test("Catch short emails", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.register("b", password));
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        expect(response.data.register[0]).toEqual({
            path: "email",
            message: errorMessages_1.emailNotLongEnough,
        });
    }));
    test("Catch no email", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.register("", password));
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        expect(response.data.register[0]).toEqual({
            path: "email",
            message: errorMessages_1.emailRequired,
        });
    }));
    test("Catch short passwords", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.register(email, "1"));
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        expect(response.data.register[0]).toEqual({
            path: "password",
            message: errorMessages_1.passwordNotLongEnough,
        });
    }));
    test("Catch no password", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.register(email, ""));
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        expect(response.data.register[0]).toEqual({
            path: "password",
            message: errorMessages_1.passwordRequired,
        });
    }));
});
//# sourceMappingURL=register.test.js.map