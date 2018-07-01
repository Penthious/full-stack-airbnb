import gql from "graphql-tag";
import { PureComponent, ComponentClass } from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import { RegisterMutationVariables, RegisterMutation } from "./__generated__/RegisterMutation";

interface Props {
    children: (data: { submit: (values: RegisterMutationVariables) => Promise<null> }) => JSX.Element | null
}

class Register extends PureComponent<ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>> {
    submit = async (values: RegisterMutationVariables) => {
        console.log(values, this.props)
        try {
            const response = await this.props.mutate({
                variables: values
            });
            console.log(response)
        } catch (error) {
            console.log(error)

        }
        return null;
    }
    render() {
        return this.props.children({ submit: this.submit })
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

export const RegisterController = graphql<Props, RegisterMutation, RegisterMutationVariables>(registerMutation)(Register) as ComponentClass<Props>;