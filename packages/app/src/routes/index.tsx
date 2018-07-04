import * as React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';

import { LoginConnector } from '../modules/login/LoginConnector';
import { RegisterConnector } from '../modules/register/RegisterConnector';

export const Routes = () => (
    <NativeRouter initialEntries={['/login']}>
        <Switch>
            <Route exact={true} path='/login' component={LoginConnector} />
            <Route exact={true} path='/register' component={RegisterConnector} />
        </Switch>
    </NativeRouter>
);
