import * as React from "react";
import { PureComponent } from "react";
import RegisterView from "./view/RegisterView";
import {
  RegisterController
} from "@airbnb-clone/controller"

export class RegisterConnector extends PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    )
  }
}

export default RegisterConnector;
