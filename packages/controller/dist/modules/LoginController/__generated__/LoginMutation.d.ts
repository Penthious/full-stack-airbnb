export interface LoginMutation_login {
    path: string;
    message: string;
}
export interface LoginMutation {
    login: LoginMutation_login[] | null;
}
export interface LoginMutationVariables {
    email: string;
    password: string;
}
