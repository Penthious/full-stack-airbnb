"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
class Base {
    getUserRepository() {
        return typeorm_1.getRepository(User_1.User);
    }
}
exports.default = Base;
//# sourceMappingURL=BaseRepository.js.map