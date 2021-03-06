import * as React from "react";
import { PureComponent } from "react";
import RegisterView from "../register/view/RegisterView";
import { RegisterController } from "@airbnb-clone/controller";

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
