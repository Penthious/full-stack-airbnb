import * as React from "react";
import { FieldProps } from "formik";
import { Form, Button } from "antd";

export const SubmitButton: React.SFC<
  FieldProps<any> & { disabled?: boolean; text?: string }
> = ({
  field, // name, value, onChange, onBlur
  form: { isSubmitting, isValid, ...form },
  ...props
}) => {
  return (
    <Form.Item>
      <Button
        {...field}
        {...props}
        disabled={!isValid || isSubmitting || props.disabled}
      >
        {props.text}
      </Button>
    </Form.Item>
  );
};
