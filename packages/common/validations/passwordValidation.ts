import * as yup from "yup";

import {
  passwordNotLongEnough,
  passwordRequired,
} from "../errorMessages/registerErrors";

export const passwordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required(passwordRequired);
