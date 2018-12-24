import * as React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from "@airbnb-clone/controller";
import { PureComponent } from "react";
import { registerUserSchema } from "@airbnb-clone/common";
import { withFormik, FormikProps, Field } from "formik";

import { InputField } from "../../shared/InputField";
import { SubmitButton } from "../../shared/SubmitButton";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
  handleModal: () => void;
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
            type="password"
            prefix={
              <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            component={InputField}
          />
          <Form.Item>
            <Form.Item>
              <Link to="/forgot-password" className="login-form-forgot">
                Forgot password
              </Link>
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
              Or <Link to="/login">Login now!</Link>
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
    } else {
      props.handleModal();
    }
  },
})(RegisterView);
