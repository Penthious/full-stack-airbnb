import * as yup from "yup";

import { missingPasswordKeyError } from "../errorMessages/forgotPasswordErrors";

export const newPasswordKeyValidation = yup
  .string()
  .required(missingPasswordKeyError);
