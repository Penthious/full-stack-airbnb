import * as yup from "yup";

import {
  emailNotLongEnough,
  invalidEmail,
  emailRequired,
  passwordNotLongEnough,
  passwordRequired,
} from "../../errorMessages/registerErrors";

export const emailValidation = yup
  .string()
  .min(3, emailNotLongEnough)
  .max(255)
  .email(invalidEmail)
  .required(emailRequired)

export const passwordValidation = yup
  .string()
  .min(3, passwordNotLongEnough).max(255).required(passwordRequired);

export const registerUserSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
})
