import * as React from "react";

interface Props {
  logout: (multi: boolean) => void;
  onFinsh: () => void;
}
export class CallLogout extends React.PureComponent<Props> {
  async componentDidMount() {
    await this.props.logout(false);
    this.props.onFinsh();
  }
  render() {
    return null;
  }
}

export default CallLogout;
