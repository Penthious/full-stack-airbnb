import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { PureComponent, ComponentClass } from "react";

import {SendForgotPasswordEmail, SendForgotPasswordEmailVariables} from "../../generatedTypes";

interface Props {
  children: (
    data: {
      submit: (
        values: SendForgotPasswordEmailVariables,
      ) => Promise< null>;
    },
  ) => JSX.Element | null;
}

class ForgotPassword extends PureComponent<
  ChildMutateProps<Props, SendForgotPasswordEmail, SendForgotPasswordEmailVariables>
> {
  submit = async (values: SendForgotPasswordEmailVariables) => {
     await this.props.mutate({
      variables: values,
    });

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const ForgotPasswordController = graphql<
  Props,
  SendForgotPasswordEmail,
  SendForgotPasswordEmailVariables
>(forgotPasswordMutation)(ForgotPassword) as ComponentClass<Props>;
