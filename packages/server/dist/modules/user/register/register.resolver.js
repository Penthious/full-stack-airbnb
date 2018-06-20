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
const typescript_ioc_1 = require("typescript-ioc");
const UserService_1 = require("../../../services/UserService");
const createConfirmEmailLink_1 = require("../../../utils/createConfirmEmailLink");
const errorMessages_1 = require("./errorMessages");
const formatYupError_1 = require("../../../utils/formatYupError");
const sendEmail_1 = require("../../../utils/sendEmail");
const common_1 = require("@airbnb-clone/common");
let Register = class Register {
    constructor(userService) {
        this.userService = userService;
        this.resolvers = {
            Mutation: {
                register: (_, args, context) => this.register(_, args, context),
            },
        };
    }
    register(_, args, { redis, url }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield common_1.registerUserSchema.validate(args, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const { email, password } = args;
            const userExists = yield this.userService.findOne({ email }, {
                select: ["id"],
            });
            if (userExists) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.duplicateEmail,
                    },
                ];
            }
            const user = yield this.userService.create({
                email,
                password,
            });
            if (!process.env.TEST_HOST) {
                yield sendEmail_1.sendEmail(email, yield createConfirmEmailLink_1.createConfirmEmailLink(url, user.id, redis));
            }
            return null;
        });
    }
};
Register = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [UserService_1.default])
], Register);
exports.default = Register;
//# sourceMappingURL=register.resolver.js.map