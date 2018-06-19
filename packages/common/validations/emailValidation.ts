import * as yup from "yup";

import {
  emailNotLongEnough,
  invalidEmail,
  emailRequired,
} from "../errorMessages/registerErrors";

export const emailValidation = yup
  .string()
  .min(3, emailNotLongEnough)
  .max(255)
  .email(invalidEmail)
  .required(emailRequired);
