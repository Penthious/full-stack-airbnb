import * as React from "react";
import { PureComponent } from "react";
import { View, Button } from "react-native";
import { registerUserSchema } from "@airbnb-clone/common";
import { withFormik, FormikErrors, FormikValues, FormikProps, Field } from "formik";

import { InputField } from '../../shared/InputField';

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
      <View style={{ marginTop: 200 }}>
        <Field
          name="email"
          placeholder="Email"
          component={InputField}
        />
        <Field
          name="password"
          secureTextEntry={true}
          placeholder="Password"
          component={InputField}
        />
        <Button title="submit" onPress={handleSubmit as any} />
      </View>
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
