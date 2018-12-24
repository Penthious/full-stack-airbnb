import * as React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";
import { PureComponent } from "react";
import { withFormik, FormikProps, Field } from "formik";

import { InputField } from "../../shared/InputField";
import { SubmitButton } from "../../shared/SubmitButton";
import { NormalizedErrorMap } from "@airbnb-clone/controller";
import { forgotPasswordSchema } from "@airbnb-clone/common";

interface FormValues {
  newPassword: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

export class ChangePasswordView extends PureComponent<
  FormikProps<FormValues> & Props
> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="newPassword"
            placeholder="Enter a new password"
            type="password"
            prefix={
              <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            component={InputField}
          />
          <Form.Item>
            <Field
              name="submit"
              type="primary"
              htmlType="submit"
              className="changepassword-form-button"
              text="Change Password"
              component={SubmitButton}
            />
            <Form.Item>
              Or <Link to="/register">register</Link>
            </Form.Item>
          </Form.Item>
        </div>
      </form>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: forgotPasswordSchema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(ChangePasswordView);
