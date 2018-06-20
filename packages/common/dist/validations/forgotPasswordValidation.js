"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const forgotPasswordErrors_1 = require("../errorMessages/forgotPasswordErrors");
const registerValidation_1 = require("./registerValidation");
exports.newPasswordKeyValidation = yup
    .string()
    .required(forgotPasswordErrors_1.missingPasswordKeyError);
exports.forgotPasswordSchema = yup.object().shape({
    newPassword: registerValidation_1.passwordValidation,
    key: exports.newPasswordKeyValidation,
});
//# sourceMappingURL=forgotPasswordValidation.js.map