import * as React from 'react';
import { PureComponent } from 'react';
import RegisterView from '../register/view/RegisterView';

export class RegisterConnector extends PureComponent {
    dummySubmit = async (values: any) => {
        console.log(values);

        return null;
    }
    render() {
        return (<RegisterView submit={this.dummySubmit} />)
    }
}

export default RegisterConnector;