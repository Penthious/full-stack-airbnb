import * as React from "react";
import { FieldProps } from "formik";
import { Form, Select } from "antd";

export const TagField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
  }
> = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  const setValue = (newValue: string) => setFieldValue(field.name, newValue);

  return (
    <Form.Item
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <Select {...field} {...props} mode="tags" onChange={setValue} />
    </Form.Item>
  );
};
