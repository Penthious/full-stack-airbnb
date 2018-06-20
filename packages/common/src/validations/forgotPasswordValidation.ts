import * as yup from "yup";

import { missingPasswordKeyError } from "../errorMessages/forgotPasswordErrors";
import { passwordValidation } from "./registerValidation";

export const newPasswordKeyValidation = yup
  .string()
  .required(missingPasswordKeyError);

export const forgotPasswordSchema = yup.object().shape({
  newPassword: passwordValidation,
  key: newPasswordKeyValidation,
});
