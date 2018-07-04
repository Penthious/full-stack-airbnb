"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const errorMessages_1 = require("../../errorMessages");
exports.loginSchema = yup.object().shape({
    email: yup.string().min(3, errorMessages_1.invalidLogin).max(255, errorMessages_1.invalidLogin).email(errorMessages_1.invalidLogin).required(),
    password: yup.string().min(3, errorMessages_1.invalidLogin).max(255, errorMessages_1.invalidLogin).required(),
});
//# sourceMappingURL=loginValidation.js.map