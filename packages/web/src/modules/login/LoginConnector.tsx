import * as React from "react";
import { LoginController } from "@airbnb-clone/controller";
import { PureComponent } from "react";

import LoginView from "./view/LoginView";
import { RouteComponentProps } from "react-router-dom";

export class LoginConnector extends PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    const {
      history,
      location: { state },
    } = this.props;
    if (state && state.next) {
      return history.push(state.next);
    } else {
      history.push("/");
    }
  };
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} onFinish={this.onFinish} />}
      </LoginController>
    );
  }
}

export default LoginConnector;
