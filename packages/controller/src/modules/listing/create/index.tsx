import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  CreateListingMutation,
  CreateListingMutationVariables,
} from "../../../generatedTypes";

export const createListingMutation = gql`
  mutation CreateListingMutation(
    $name: String!
    $category: String!
    $description: String!
    $beds: Int!
    $guests: Int!
    $price: Float!
    $latitude: Float!
    $longitude: Float!
    $amenities: [String!]!
  ) {
    createListing(
      input: {
        name: $name
        category: $category
        description: $description
        price: $price
        beds: $beds
        guests: $guests
        latitude: $latitude
        longitude: $longitude
        amenities: $amenities
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
