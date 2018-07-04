
import * as React from "react";
import { Button, Card, Text } from "react-native-elements";
import { PureComponent } from "react";
import { View } from "react-native";
import { loginSchema } from "@airbnb-clone/common";
import { Field, FormikProps, withFormik } from "formik";

import { InputField } from '../../shared/InputField';

interface FormValues {
    email: string;
    password: string;
}

interface Props {
    submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

export class LoginView extends PureComponent<
    FormikProps<FormValues> & Props
    > {
    render() {
        const { handleSubmit } = this.props;
        return (
            <View style={{ flex: 1, display: 'flex', justifyContent: "center" }}>
                <Card>
                    <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
                    <Field
                        name="email"
                        placeholder="Email"
                        component={InputField}
                        containerStyle={{ width: '100%' }}
                        autoCapitalize="none"
                    />
                    <Field
                        name="password"
                        secureTextEntry={true}
                        placeholder="Password"
                        component={InputField}
                        containerStyle={{ width: '100%' }}
                    />
                    <Button buttonStyle={{ marginTop: 30 }} title="submit" onPress={handleSubmit as any} />
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
        console.log(errors)
        if (errors) {
            setErrors(errors);
        }
    },
})(LoginView);
