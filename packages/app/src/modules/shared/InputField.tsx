import * as React from "react";
import { Component } from "react";
import { FieldProps } from "formik";
import { Input } from "react-native-elements";

const errorStyle = {
  color: "red",
};

export class InputField extends Component<FieldProps<any>> {
  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name },
    } = this.props;

    setFieldValue(name, text);
  };

  render() {
    const {
      field: { value, name },
      form: { touched, errors },
      ...props
    } = this.props;
    const errorCheck = touched[name] && errors[name] ? errors[name] : undefined;

    return (
      <Input
        {...props}
        errorStyle={errorStyle}
        errorMessage={errorCheck as string | undefined}
        onChangeText={this.onChangeText}
        value={value}
      />
    );
  }
}
