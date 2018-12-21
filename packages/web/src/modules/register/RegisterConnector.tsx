import * as React from "react";
import { PureComponent } from "react";
import { RegisterController } from "@airbnb-clone/controller";

import RegisterView from "./view/RegisterView";

export class RegisterConnector extends PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}

export default RegisterConnector;
