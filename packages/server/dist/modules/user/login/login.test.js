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
const email = "tom@bob.com";
const password = "aoeuaoeuaoeu";
const client = typescript_ioc_1.Container.get(testCLient_1.default);
const app = typescript_ioc_1.Container.get(App_1.default);
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield app.createConn();
    yield client.createUser();
}));
afterAll((done) => __awaiter(this, void 0, void 0, function* () {
    yield app.stop();
    done();
}));
describe("login", () => {
    test("fails if no user is found", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.login("no_user@false.com", "hey I am password"));
        expect(response.data.login).toEqual({
            errors: [
                {
                    path: "email/password",
                    message: errorMessages_1.invalidLogin,
                },
            ],
            sessionId: null,
        });
    }));
    test("fails if user is found but password is wrong", () => __awaiter(this, void 0, void 0, function* () {
        const response = (yield client.login(email, "FAIL_PASSWORD"));
        expect(response.data.login).toEqual({
            errors: [
                {
                    path: "email/password",
                    message: errorMessages_1.invalidLogin,
                },
            ],
            sessionId: null,
        });
    }));
    test("fails if user logs in correctly but confirmed is false", () => __awaiter(this, void 0, void 0, function* () {
        yield User_1.User.update({ email }, { confirmed: false });
        const response = (yield client.login(email, password));
        expect(response.data.login).toEqual({
            errors: [
                {
                    path: "email",
                    message: errorMessages_1.confirmEmailError,
                },
            ],
            sessionId: null,
        });
    }));
    test("User can login", () => __awaiter(this, void 0, void 0, function* () {
        yield User_1.User.update({ email }, { confirmed: true });
        expect(yield client.login(email, password)).toMatchObject({
            data: {
                login: {
                    errors: null,
                    sessionId: expect.any(String),
                },
            },
        });
    }));
});
