import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input, InputNumber } from "antd";

export const InputField: React.SFC<
  FieldProps<any> & {
    prefix?: React.ReactNode;
    useNumberComponent?: boolean;
    label?: string;
  }
> = ({
  field: { onChange, ...field }, // name, value, onChange, onBlur
  form: { touched, errors, setFieldValue }, // setXXX, handleXXX, dirty, isValid
  useNumberComponent,
  label,
  ...props
}) => {
  const errorCheck = touched[field.name] && errors[field.name];
  const Comp = useNumberComponent ? (InputNumber as any) : Input;

  return (
    <Form.Item
      help={errorCheck}
      label={label}
      validateStatus={errorCheck ? "error" : undefined}
    >
      <Comp
        {...field}
        {...props}
        onChange={
          useNumberComponent
            ? (newValue: number) => setFieldValue(field.name, newValue)
            : onChange
        }
      />
    </Form.Item>
  );
};
