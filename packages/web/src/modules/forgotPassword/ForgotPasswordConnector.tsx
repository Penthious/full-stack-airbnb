import * as React from "react";
import { ForgotPasswordController } from "@airbnb-clone/controller";
import { PureComponent } from "react";
import Modal from "../../components/Modal";

import ForgotPasswordView from "./view/ForgotPasswordView";

export class ForgotPasswordConnector extends PureComponent {
  state = { visible: false };
  handleModal = () => {
    this.setState({ visible: !this.state.visible });
    return this.state.visible;
  };
  render() {
    return (
      <React.Fragment>
        <ForgotPasswordController>
          {({ submit }) => (
            <ForgotPasswordView
              submit={submit}
              visible={this.state.visible}
              handleModal={this.handleModal}
            />
          )}
        </ForgotPasswordController>
        <Modal
          visible={this.state.visible}
          handleModal={this.handleModal}
          title="Forgot Password"
          content="Please look at your email to update your password"
        />
      </React.Fragment>
    );
  }
}

export default ForgotPasswordConnector;
