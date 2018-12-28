import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  CreateListingMutation,
  CreateListingMutationVariables,
} from "../../../generatedTypes";

export const createListingMutation = gql`
  mutation CreateListingMutation(
    $amenities: [String!]!
    $beds: Int!
    $category: String!
    $description: String!
    $guests: Int!
    $latitude: Float!
    $longitude: Float!
    $name: String!
    $picture: Upload
    $price: Float!
  ) {
    createListing(
      input: {
        amenities: $amenities
        beds: $beds
        category: $category
        description: $description
        guests: $guests
        latitude: $latitude
        longitude: $longitude
        name: $name
        picture: $picture
        price: $price
      }
    )
  }
`;

export interface WithCreateListingProps {
  createListing: (varibles: CreateListingMutationVariables) => void;
}
export const withCreateListing = graphql<
  any,
  CreateListingMutation,
  CreateListingMutationVariables,
  WithCreateListingProps
>(createListingMutation, {
  props: ({ mutate }) => ({
    createListing: variables => {
      console.log("we are here in create listing");

      if (!mutate) {
        return;
      }
      mutate({ variables });
    },
  }),
});
