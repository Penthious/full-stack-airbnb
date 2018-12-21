import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { PureComponent, ComponentClass } from "react";

import { LoginMutation, LoginMutationVariables } from "../../generatedTypes";
import { normalizeErrors } from "../utils/normalizeErrors";

interface Props {
  children: (
    data: {
      submit: (
        values: LoginMutationVariables,
      ) => Promise<{
        [key: string]: string;
      } | null>;
    },
  ) => JSX.Element | null;
}

class Login extends PureComponent<
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    console.log(values);
    const {
      data: { login },
    } = await this.props.mutate({
      variables: values,
    });
    console.log("response: ", login);

    if (login) {
      return normalizeErrors(login);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(Login) as ComponentClass<Props>;
