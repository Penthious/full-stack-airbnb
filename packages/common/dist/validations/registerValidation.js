"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const registerErrors_1 = require("../errorMessages/registerErrors");
exports.emailValidation = yup
    .string()
    .min(3, registerErrors_1.emailNotLongEnough)
    .max(255)
    .email(registerErrors_1.invalidEmail)
    .required(registerErrors_1.emailRequired);
exports.passwordValidation = yup
    .string()
    .min(3, registerErrors_1.passwordNotLongEnough).max(255).required(registerErrors_1.passwordRequired);
exports.registerUserSchema = yup.object().shape({
    email: exports.emailValidation,
    password: exports.passwordValidation,
});
//# sourceMappingURL=registerValidation.js.map