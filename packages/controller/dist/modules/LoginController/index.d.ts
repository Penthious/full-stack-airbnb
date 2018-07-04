import { ComponentClass } from "react";
import { LoginMutationVariables } from "./__generated__/LoginMutation";
interface Props {
    children: (data: {
        submit: (values: LoginMutationVariables) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const LoginController: ComponentClass<Props>;
export {};
