import * as React from "react";
import gql from "graphql-tag";
import { ChildProps, graphql } from "react-apollo";
import { MeQuery } from "../../generatedTypes";
import { PureComponent } from "react";
import { Route, RouteComponentProps, RouteProps, Redirect } from "react-router";
type Props = RouteProps;

export class Auth extends PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      return null;
    }

    if (!data.me || data.error) {
      // user not logged in
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname },
          }}
        />
      );
    }

    const Component = component as any;
    return <Component {...routeProps} />;
  };
  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

export const AuthRoute = graphql<Props, MeQuery>(meQuery)(Auth);
