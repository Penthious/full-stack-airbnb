import * as React from "react";
import { PureComponent } from "react";
import { Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { loginSchema } from "@airbnb-clone/common";
import {
  withFormik,
  FormikErrors,
  FormikValues,
  FormikProps,
  Field,
} from "formik";

import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormikValues> | null>;
}

export class LoginView extends PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
          <Field
            autoCapitalize="none"
            component={InputField}
            containerStyle={{ width: "100%" }}
            name="email"
            placeholder="Email"
          />
          <Field
            autoCapitalize="none"
            component={InputField}
            containerStyle={{ width: "100%" }}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <Button
            onPress={handleSubmit as any}
            style={{ marginTop: 30 }}
            title="submit"
          />
        </Card>
      </View>
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
