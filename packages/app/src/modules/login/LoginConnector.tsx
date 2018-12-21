import * as React from "react";
import { PureComponent } from "react";
import LoginView from "../login/view/LoginView";
import { LoginController } from "@airbnb-clone/controller";

export class LoginConnector extends PureComponent {
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}

export default LoginConnector;
