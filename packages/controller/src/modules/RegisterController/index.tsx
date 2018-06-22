import gql from "graphql-tag";
import { PureComponent, ComponentClass } from "react";
import { ChildMutateProps, graphql } from "react-apollo";

interface Props {
    children: (data: { submit: (values: any) => Promise<null> }) => JSX.Element | null
}

class registerController extends PureComponent<ChildMutateProps<Props, any, any>> {
    submit = async (values: { email: string; password: string }) => {
        console.log(values, this.props)
        const response = await this.props.mutate({
            variables: values
        });
        console.log(response)
        return null;
    }
    render() {
        return this.props.children({ submit: this.submit })
    }
}

const registerMutation = gql`
  mutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const RegisterController = graphql(registerMutation)(registerController) as ComponentClass;