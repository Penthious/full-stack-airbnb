import * as yup from "yup";
import {
  amenitiesValidation,
  bedsValidation,
  categoryValidation,
  descriptionValidation,
  guestsValidation,
  latitudeValidation,
  longitudeValidation,
  nameValidation,
  priceValidation,
} from "./validations";

export const createListingSchema = yup.object().shape({
  amenities: amenitiesValidation,
  beds: bedsValidation,
  category: categoryValidation,
  description: descriptionValidation,
  guests: guestsValidation,
  latitude: latitudeValidation,
  longitude: longitudeValidation,
  name: nameValidation,
  price: priceValidation,
});
