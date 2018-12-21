import * as React from "react";
import { LoginController } from "@airbnb-clone/controller";
import { PureComponent } from "react";

import LoginView from "./view/LoginView";

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
