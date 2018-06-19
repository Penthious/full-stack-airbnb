import * as React from "react";
import { PureComponent } from "react";
import RegisterView from "./view/RegisterView";

export class RegisterConnector extends PureComponent {
  dummySubmit = async (values: {
    email: string;
    password: string;
  }): Promise<any> => {
    console.log(values);
  };

  render() {
    return <RegisterView submit={this.dummySubmit} />;
  }
}

export default RegisterConnector;
