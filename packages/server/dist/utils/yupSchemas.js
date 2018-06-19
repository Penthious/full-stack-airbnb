"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const errorMessages_1 = require("../modules/user/register/errorMessages");
const errorMessages_2 = require("../modules/user/forgotPassword/errorMessages");
exports.emailValidation = yup
    .string()
    .min(3, errorMessages_1.emailNotLongEnough)
    .max(255)
    .email(errorMessages_1.invalidEmail);
exports.passwordValidation = yup
    .string()
    .min(3, errorMessages_1.passwordNotLongEnough)
    .max(255);
exports.newPasswordKeyValidation = yup
    .string()
    .required(errorMessages_2.missingPasswordKeyError);
//# sourceMappingURL=yupSchemas.js.map