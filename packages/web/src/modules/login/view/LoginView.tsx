import * as React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";
import { PureComponent } from "react";
import { loginSchema } from "@airbnb-clone/common";
import { withFormik, FormikProps, Field } from "formik";

import { InputField } from "../../shared/InputField";
import { SubmitButton } from "../../shared/SubmitButton";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

export class LoginView extends PureComponent<FormikProps<FormValues> & Props> {
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
            type="password"
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
              text="Login"
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
  validationSchema: loginSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(LoginView);
