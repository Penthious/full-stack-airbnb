import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { PureComponent, ComponentClass } from "react";

import {
  ForgotPasswordUpdate,
  ForgotPasswordUpdateVariables,
} from "../../generatedTypes";
import { normalizeErrors } from "../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  children: (
    data: {
      submit: (
        values: ForgotPasswordUpdateVariables,
      ) => Promise<NormalizedErrorMap | null>;
    },
  ) => JSX.Element | null;
}

class ChangePassword extends PureComponent<
  ChildMutateProps<Props, ForgotPasswordUpdate, ForgotPasswordUpdateVariables>
> {
  submit = async (values: ForgotPasswordUpdateVariables) => {
    console.log(values);

    const {
      data: { forgotPasswordUpdate },
    } = await this.props.mutate({
      variables: values,
    });

    if (forgotPasswordUpdate) {
      return normalizeErrors(forgotPasswordUpdate);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const changePasswordMutation = gql`
  mutation ForgotPasswordUpdate($newPassword: String!, $key: String!) {
    forgotPasswordUpdate(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

export const ChangePasswordController = graphql<
  Props,
  ForgotPasswordUpdate,
  ForgotPasswordUpdateVariables
>(changePasswordMutation)(ChangePassword) as ComponentClass<Props>;
