// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    me: IUser | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    createListing: boolean;
    forgotPasswordUpdate: Array<IError> | null;
    sendForgotPasswordEmail: boolean;
    login: ILoginResponse;
    logout: boolean;
    register: Array<IError> | null;
  }

  interface ICreateListingOnMutationArguments {
    input: ICreateListingInput;
  }

  interface IForgotPasswordUpdateOnMutationArguments {
    newPassword: string;
    key: string;
  }

  interface ISendForgotPasswordEmailOnMutationArguments {
    email: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface ILogoutOnMutationArguments {
    multi: boolean;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateListingInput {
    amenities: Array<string>;
    beds: number;
    category: string;
    description: string;
    guests: number;
    latitude: number;
    longitude: number;
    name: string;
    price: number;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface ILoginResponse {
    __typename: 'LoginResponse';
    errors: Array<IError> | null;
    sessionId: string | null;
  }
}

// tslint:enable
