import * as React from "react";
import { PureComponent } from "react";
import RegisterView from "./view/RegisterView";

export class RegisterConnector extends PureComponent {
  handleSubmit = async (values: any) => {
    console.log(values);
    return null;
  };
  render() {
    return (
      <div>
        <RegisterView submit={this.handleSubmit} />
      </div>
    );
  }
}

export default RegisterConnector;
