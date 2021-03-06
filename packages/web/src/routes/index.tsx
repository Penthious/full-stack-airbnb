import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute } from "@airbnb-clone/controller";

import ForgotPasswordConnector from "../modules/forgotPassword/ForgotPasswordConnector";
import LoginConnector from "../modules/login/LoginConnector";
import RegisterConnector from "../modules/register/RegisterConnector";
import ChangePasswordConnector from "../modules/changePassword/ChangePasswordConnector";
import CreateListingConnector from "../modules/listing/create/CreateListingConnector";
import FindListingsConnector from "../modules/listing/find/FindListingsConnector";
import Logout from "../modules/logout/Logout";

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
      <Route
        exact={true}
        path={"/listings"}
        component={FindListingsConnector}
      />
      <Route path="/logout" component={Logout} />
      <AuthRoute
        exact={true}
        path={"/listings/create"}
        component={CreateListingConnector}
      />
    </Switch>
  </BrowserRouter>
);
