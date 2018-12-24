import * as React from "react";
import { PureComponent } from "react";
import { RegisterController } from "@airbnb-clone/controller";

import Modal from "../../components/Modal";
import RegisterView from "./view/RegisterView";

export class RegisterConnector extends PureComponent {
  state = { visible: false };
  handleModal = () => {
    this.setState({ visible: !this.state.visible });
    return this.state.visible;
  };
  render() {
    return (
      <React.Fragment>
        <RegisterController>
          {({ submit }) => (
            <RegisterView submit={submit} handleModal={this.handleModal} />
          )}
        </RegisterController>
        <Modal
          visible={this.state.visible}
          handleModal={this.handleModal}
          title="Register"
          content="Please look at your email to confirm your account."
        />
      </React.Fragment>
    );
  }
}

export default RegisterConnector;
