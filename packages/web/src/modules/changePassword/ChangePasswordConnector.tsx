import * as React from "react";
import { ChangePasswordController } from "@airbnb-clone/controller";
import { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

import ChangePasswordView from "./view/ChangePasswordView";

export class ChangePasswordConnector extends PureComponent<
  RouteComponentProps<{ key: string }>
> {
  onSuccess = () => this.props.history.push("/login");
  render() {
    const {
      match: {
        params: { key },
      },
    } = this.props;

    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePasswordView
            resetKey={key}
            submit={submit}
            onSuccess={this.onSuccess}
          />
        )}
      </ChangePasswordController>
    );
  }
}

export default ChangePasswordConnector;
