import * as React from "react";
import { FieldProps } from "formik";
import { Button } from "react-native-elements";

export const SubmitButton: React.SFC<
  FieldProps<any> & { disabled?: boolean; text?: string }
> = ({
  field, // name, value, onChange, onBlur
  form: { isSubmitting, isValid },
  ...props
}) => {
  return (
    <Button
      {...field}
      {...props}
      disabled={(!isSubmitting && !isValid) || props.disabled}
    >
      {props.text}
    </Button>
  );
};
