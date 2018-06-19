declare namespace LOGIN {
  interface login {
    data: {
      login: null;
    };
  }

  interface loginError {
    data: {
      login: [GQL.IError];
    };
  }
}
