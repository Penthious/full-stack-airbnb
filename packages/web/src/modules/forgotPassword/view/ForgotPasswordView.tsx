import * as React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from "@airbnb-clone/controller";
import { PureComponent } from "react";
import { withFormik, FormikProps, Field } from "formik";

import { InputField } from "../../shared/InputField";
import { SubmitButton } from "../../shared/SubmitButton";

interface FormValues {
  email: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
  visible: boolean;
  handleModal: () => void;
}

export class ForgotPasswordView extends PureComponent<
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
          <Form.Item>
            <Field
              name="submit"
              type="primary"
              htmlType="submit"
              className="forgotpassword-form-button"
              text="Reset Password"
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
  mapPropsToValues: () => ({ email: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    console.log("===========================");

    console.log(props);

    if (errors) {
      setErrors(errors);
    } else {
      props.handleModal();
    }
  },
})(ForgotPasswordView);
