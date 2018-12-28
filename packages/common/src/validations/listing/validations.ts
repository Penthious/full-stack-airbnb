import * as yup from "yup";
import { notLongEnough, valueRequired } from "../helpers";

export const nameValidation = yup
  .string()
  .min(3, notLongEnough("name", 3))
  .max(255)
  .required(valueRequired("name"));
export const categoryValidation = yup
  .string()
  .min(3, notLongEnough("category", 3));
export const descriptionValidation = yup
  .string()
  .min(3, notLongEnough("description", 3))
  .max(255);
export const priceValidation = yup.number().max(255);
export const bedsValidation = yup.number().max(255);
export const guestsValidation = yup.number().max(255);
export const latitudeValidation = yup.number().max(255);
export const longitudeValidation = yup.number().max(255);
export const amenitiesValidation = yup.array();
