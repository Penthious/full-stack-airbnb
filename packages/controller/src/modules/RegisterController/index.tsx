import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { PureComponent, ComponentClass } from "react";

import { normalizeErrors } from "../utils/normalizeErrors";
import {
  RegisterMutationVariables,
  RegisterMutation,
} from "../../generatedTypes";

interface Props {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables,
      ) => Promise<{ [key: string]: string } | null>;
    },
  ) => JSX.Element | null;
}

class Register extends PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    console.log(values, this.props);
    const {
      data: { register },
    } = await this.props.mutate({
      variables: values,
    });
    console.log(register);
    if (register) {
      return normalizeErrors(register);
    }

    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(Register) as ComponentClass<Props>;
