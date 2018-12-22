import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { PureComponent, ComponentClass } from "react";

import { LoginMutation, LoginMutationVariables } from "../../generatedTypes";
import { normalizeErrors } from "../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  children: (
    data: {
      submit: (
        values: LoginMutationVariables,
      ) => Promise<NormalizedErrorMap | null>;
    },
  ) => JSX.Element | null;
}

class ForgotPassword extends PureComponent<
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    console.log(values);
    const {
      data: {
        login: { errors, sessionId },
      },
    } = await this.props.mutate({
      variables: values,
    });
    console.log("response id: ", sessionId);
    console.log("response errors: ", errors);

    if (errors) {
      return normalizeErrors(errors);
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
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

export const ForgotPasswordController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(ForgotPassword) as ComponentClass<Props>;
