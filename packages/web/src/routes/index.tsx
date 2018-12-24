import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ForgotPasswordConnector from "../modules/forgotPassword/ForgotPasswordConnector";
import LoginConnector from "../modules/login/LoginConnector";
import RegisterConnector from "../modules/register/RegisterConnector";
import ChangePasswordConnector from "../modules/changePassword/ChangePasswordConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact={true}
        path={"/forgot-password"}
        component={ForgotPasswordConnector}
      />
      <Route exact={true} path={"/register"} component={RegisterConnector} />
      <Route exact={true} path={"/login"} component={LoginConnector} />
      <Route
        exact={true}
        path={"/change-password/:key"}
        component={ChangePasswordConnector}
      />
    </Switch>
  </BrowserRouter>
);
