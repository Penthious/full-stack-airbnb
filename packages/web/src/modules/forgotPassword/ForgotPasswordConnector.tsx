import * as React from "react";
import { ForgotPasswordController } from "@airbnb-clone/controller";
import { PureComponent } from "react";

import ForgotPasswordView from "./view/ForgotPasswordView";

export class ForgotPasswordConnector extends PureComponent {
  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => <ForgotPasswordView submit={submit} />}
      </ForgotPasswordController>
    );
  }
}

export default ForgotPasswordConnector;
