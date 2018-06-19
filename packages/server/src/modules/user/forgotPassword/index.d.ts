declare namespace FORGOTPASSWORD {
  interface forgotPasswordChange {
    data: {
      forgotPasswordChange: null;
    };
  }

  interface forgotPasswordChangeError {
    data: {
      forgotPasswordChange: [GQL.IError];
    };
  }
}
