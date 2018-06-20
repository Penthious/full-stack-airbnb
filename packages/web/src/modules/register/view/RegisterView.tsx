import * as React from "react";
import { Button, Form, Icon, Input } from "antd";
import { PureComponent } from "react";
import { withFormik, FormikErrors, FormikValues, FormikProps } from "formik";
import { registerUserSchema } from "@airbnb-clone/common";

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
    const { values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting, isValid } = this.props;
    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: "auto" }}>
          <Form.Item help={touched.email && errors.email} validateStatus={touched.email && errors.email && "error"}>
            <Input
              name="email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item help={touched.password && errors.password} validateStatus={touched.password && errors.password && "error"}>
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
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
                disabled={isSubmitting && !isValid}
              >
                Register
              </Button>
            </Form.Item>
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
