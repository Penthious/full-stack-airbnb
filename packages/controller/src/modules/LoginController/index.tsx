import gql from "graphql-tag";
import { PureComponent, ComponentClass } from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "./__generated__/LoginMutation";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
    children: (data: { submit: (values: LoginMutationVariables) => Promise<{ [key: string]: string; } | null> }) => JSX.Element | null
}

class Login extends PureComponent<ChildMutateProps<Props, LoginMutation, LoginMutationVariables>> {
    submit = async (values: LoginMutationVariables) => {
        try {
            const { data: { login } } = await this.props.mutate({
                variables: values
            });

            if (login) {
                return normalizeErrors(login)
            }
        } catch (error) {
            console.log(error, 'we are here')
        }
        return null;
    }
    render() {
        return this.props.children({ submit: this.submit })
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

export const LoginController = graphql<Props, LoginMutation, LoginMutationVariables>(loginMutation)(Login) as ComponentClass<Props>;