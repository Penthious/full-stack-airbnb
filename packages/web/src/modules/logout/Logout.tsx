import * as React from "react";
import { PureComponent } from "react";
import { LogoutController } from "@airbnb-clone/controller";
import { RouteComponentProps } from "react-router-dom";
import CallLogout from "./CallLogout";

export class Logout extends PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push("/login");
    return null;
  };

  render() {
    return (
      <LogoutController>
        {({ logout }) => <CallLogout logout={logout} onFinsh={this.onFinish} />}
      </LogoutController>
    );
  }
}

export default Logout;
