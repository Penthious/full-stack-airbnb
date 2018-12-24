import * as React from "react";
import { Modal } from "antd";

interface Props {
  visible: boolean;
  title: string;
  content: string;
  handleModal: () => void;
}
export default class extends React.PureComponent<Props> {
  state = { visible: false };

  showModal = () => {
    this.props.handleModal();
  };

  handleOk = () => {
    this.props.handleModal();
  };

  handleCancel = () => {
    this.props.handleModal();
  };

  render() {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <p>{this.props.content}</p>
        </Modal>
      </div>
    );
  }
}
