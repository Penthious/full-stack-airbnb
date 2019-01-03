import * as React from "react";
import gql from "graphql-tag";
import { LogoutMutation, LogoutMutationVariables } from "../../generatedTypes";
import { Mutation } from "react-apollo";

const logoutMutation = gql`
  mutation LogoutMutation($multi: Boolean!) {
    logout(multi: $multi)
  }
`;

interface Props {
  children: (
    data: {
      logout: (multi: boolean) => void;
    },
  ) => JSX.Element | null;
}

export const LogoutController: React.SFC<Props> = ({ children }) => (
  <Mutation<LogoutMutation, LogoutMutationVariables> mutation={logoutMutation}>
    {(mutate, { client }) =>
      children({
        logout: async (multi: boolean) => {
          await mutate({ variables: { multi } });
          await client.resetStore();
        },
      })
    }
  </Mutation>
);
