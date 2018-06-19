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
const rp = require("request-promise");
const UserService_1 = require("../services/UserService");
const mutations_1 = require("./mutations");
const typescript_ioc_1 = require("typescript-ioc");
const queries_1 = require("./queries");
let TestClient = class TestClient {
    constructor(userService) {
        this.userService = userService;
        this.url = process.env.TEST_HOST;
        this.email = "tom@bob.com";
        this.graphqlUrl = `${this.url}/graphql`;
        this.password = "aoeuaoeuaoeu";
        this.options = {
            jar: rp.jar(),
            json: true,
            withCredentials: true,
        };
    }
    createUser(email = null, password = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.email = email || this.email;
            this.password = password || this.password;
            this.user = yield this.userService.create({
                email: this.email,
                password: this.password,
                confirmed: true,
            });
            return this.user;
        });
    }
    get $user() {
        return this.user;
    }
    forgotPasswordUpdate(newPassword, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.graphqlUrl, Object.assign({}, this.options, { body: {
                    query: mutations_1.forgotPasswordMutation(newPassword, key),
                } }));
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.graphqlUrl, Object.assign({}, this.options, { body: {
                    query: mutations_1.loginMutation(email, password),
                } }));
        });
    }
    logout(multi) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.graphqlUrl, Object.assign({}, this.options, { body: {
                    query: mutations_1.logoutMutation(multi),
                } }));
        });
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.graphqlUrl, Object.assign({}, this.options, { body: {
                    query: queries_1.meQuery,
                } }));
        });
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.graphqlUrl, Object.assign({}, this.options, { body: {
                    query: mutations_1.registerMutation(email, password),
                } }));
        });
    }
};
TestClient = __decorate([
    typescript_ioc_1.Singleton,
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [UserService_1.default])
], TestClient);
exports.default = TestClient;
//# sourceMappingURL=testCLient.js.map