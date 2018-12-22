import * as React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";

import RegisterConnector from "../modules/register/RegisterConnector";
import LoginConnector from "../modules/login/LoginConnector";

export const Routes = () => (
  <NativeRouter>
    <Switch>
      <Route exact={true} patch="/register" component={RegisterConnector} />
      <Route exact={true} patch="/login" component={LoginConnector} />
    </Switch>
  </NativeRouter>
);
