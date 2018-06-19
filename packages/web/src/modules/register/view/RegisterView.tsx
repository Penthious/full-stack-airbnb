import * as React from "react";
import { Button, Form, Icon, Input } from "antd";
import { PureComponent } from "react";
import { withFormik, FormikErrors, FormikValues, FormikProps } from "formik";
import {} from "@airbnb-clone/server";

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
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Form.Item>
            <Input
              name="email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              Or <a href="">Login now!</a>
            </Form.Item>
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(RegisterView);
