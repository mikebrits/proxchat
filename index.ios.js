/**
 * ProxChat
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import App from './src/App'

export default class ProxChat extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('ProxChat', () => ProxChat);
