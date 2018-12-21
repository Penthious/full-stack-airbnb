"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordMutation = (newPassword, key) => `
  mutation {
    forgotPasswordUpdate(newPassword: "${newPassword}", key: "${key}"){
      path
      message
    }
  }
`;
exports.loginMutation = (email, password) => `
  mutation {
    login(email: "${email}", password: "${password}"){
      errors {
        path
        message
      }
      sessionId
    }
  }
  `;
exports.logoutMutation = (multi) => `
  mutation{
    logout(multi: ${multi})
  }
  `;
exports.registerMutation = (email, password) => `
  mutation {
    register(email: "${email}", password: "${password}"){
      path
      message
    }
  }
  `;
