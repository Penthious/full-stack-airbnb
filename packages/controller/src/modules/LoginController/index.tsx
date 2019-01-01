import gql from "graphql-tag";
import { ChildMutateProps, graphql, withApollo, WithApolloClient } from "react-apollo";
import { PureComponent, ComponentClass} from "react";

import { LoginMutation, LoginMutationVariables } from "../../generatedTypes";
import { normalizeErrors } from "../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (
    data: {
      submit: (
        values: LoginMutationVariables,
      ) => Promise<NormalizedErrorMap | null>;
    },
  ) => JSX.Element | null;
}

class Login extends PureComponent<
  ChildMutateProps<WithApolloClient<Props>, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    const {
      data: {
        login: { errors, sessionId },
      },
    } = await this.props.mutate({
      variables: values,
    });

    if (errors) {
      return normalizeErrors(errors);
    }
    if (sessionId && this.props.onSessionId) {
      this.props.onSessionId(sessionId);
    }
    this.props.client.resetStore()

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(withApollo<Props>(Login as ComponentClass<WithApolloClient<Props>>))
