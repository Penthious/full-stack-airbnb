import * as yup from "yup";

import { emailValidation, passwordValidation } from "./registerValidation";

export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
