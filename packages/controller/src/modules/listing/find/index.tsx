import gql from "graphql-tag";
import { graphql } from "react-apollo";

import {
  FindListingsQuery,
  FindListingsQuery_findListings,
} from "../../../generatedTypes";

export const findListingsQuery = gql`
  query FindListingsQuery {
    findListings {
      id
      name
      pictureUrl
    }
  }
`;

export interface WithFindListingsProps {
  listings: FindListingsQuery_findListings[];
  loading: boolean;
}

export const withFindListings = graphql<
  any,
  FindListingsQuery,
  {},
  WithFindListingsProps
>(findListingsQuery, {
  props: ({ data }) => {
    let listings: FindListingsQuery_findListings[] = [];
    if (data && !data.loading && data.findListings) {
      listings = data.findListings;
    }

    return {
      listings,
      loading: data ? data.loading : false,
    };
  },
});
