export const forgotPasswordMutation = (newPassword: string, key: string) => `
  mutation {
    forgotPasswordUpdate(newPassword: "${newPassword}", key: "${key}"){
      path
      message
    }
  }
`;

export const loginMutation = (email: string, password: string) => `
  mutation {
    login(email: "${email}", password: "${password}"){
      path
      message
    }
  }
  `;

export const logoutMutation = (multi: boolean) => `
  mutation{
    logout(multi: ${multi})
  }
  `;

export const registerMutation = (email: string, password: string) => `
  mutation {
    register(email: "${email}", password: "${password}"){
      path
      message
    }
  }
  `;
