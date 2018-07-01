import * as React from 'react';
import { PureComponent } from 'react';
import { Button } from 'react-native-elements';

export class RegisterConnector extends PureComponent {
    onPress = () => {
        console.log('button press');

    }
    render() {
        return (<Button title="hello" onPress={this.onPress} />)
    }
}

export default RegisterConnector;