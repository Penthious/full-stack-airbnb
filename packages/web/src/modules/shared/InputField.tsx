import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const InputField: React.SFC<
  FieldProps<any> & { prefix?: React.ReactNode }
> = ({
  field, // name, value, onChange, onBlur
  form: { touched, errors }, // setXXX, handleXXX, dirty, isValid
  ...props
}) => {
  const errorCheck = touched[field.name] && errors[field.name];
  return (
    <Form.Item
      help={errorCheck}
      validateStatus={errorCheck && "error" ? "success" : "error"}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};
