import * as React from "react";
import { SecureStore } from "expo";
import { PureComponent } from "react";
import LoginView from "../login/view/LoginView";
import { LoginController } from "@airbnb-clone/controller";
import { SID_KEY } from "../shared/constants";

export class LoginConnector extends PureComponent {
  saveSessionId = (sessionId: string) =>
    SecureStore.setItemAsync(SID_KEY, sessionId);
  render() {
    return (
      <LoginController onSessionId={this.saveSessionId}>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}

export default LoginConnector;
