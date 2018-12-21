import * as React from "react";
import { Form, Icon } from "antd";
import { PureComponent } from "react";
import {
  withFormik,
  FormikErrors,
  FormikValues,
  FormikProps,
  Field,
} from "formik";
import { registerUserSchema } from "@airbnb-clone/common";
import { InputField } from "../../shared/InputField";
import { SubmitButton } from "../../shared/SubmitButton";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormikValues> | null>;
}

export class RegisterView extends PureComponent<
  FormikProps<FormValues> & Props
> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="email"
            placeholder="Email"
            prefix={
              <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            component={InputField}
          />
          <Field
            name="password"
            placeholder="Password"
            prefix={
              <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            component={InputField}
          />
          <Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Field
              name="submit"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              text="Register"
              component={SubmitButton}
            />
            <Form.Item>
              Or <a href="">Login now!</a>
            </Form.Item>
          </Form.Item>
        </div>
      </form>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: registerUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(RegisterView);
