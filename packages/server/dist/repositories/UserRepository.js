"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const BaseRepository_1 = require("./BaseRepository");
const EntityNotFoundError_1 = require("../exceptions/EntityNotFoundError");
const User_1 = require("../entity/User");
let UserRepository = class UserRepository extends BaseRepository_1.default {
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = User_1.User.create(params);
            return this.save(user);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user.save();
        });
    }
    update(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield User_1.User.findOne({ where: { id } }));
            try {
                if (!user) {
                    throw new EntityNotFoundError_1.default(`No User instance was found with id of ${id}`);
                }
                for (const key in params) {
                    if (key) {
                        user[key] = params[key];
                    }
                }
                return yield this.save(user);
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        });
    }
    findOne(value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUserRepository().findOne(Object.assign({ where: Object.assign({}, value) }, options));
        });
    }
    findWhereIn(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = Object.keys(params);
                const query = this.getUserRepository().createQueryBuilder("user");
                keys.map((key, index) => {
                    const value = params[key];
                    if (value) {
                        if (index === 0) {
                            query.where(`user.${key} = :value`, { value });
                        }
                        else {
                            query.orWhere(`user.${key} = :value`, { value });
                        }
                    }
                });
                const user = yield query.getOne();
                if (!user) {
                    throw new EntityNotFoundError_1.default(`No user found with ${params}`);
                }
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        });
    }
};
UserRepository = __decorate([
    typescript_ioc_1.Singleton
], UserRepository);
exports.default = UserRepository;
