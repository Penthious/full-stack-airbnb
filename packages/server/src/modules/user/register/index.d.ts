declare namespace REGISTER {
  interface register {
    data: {
      register: null;
    };
  }

  interface registerError {
    data: {
      register: [GQL.IError];
    };
  }
}
