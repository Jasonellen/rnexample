/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';

import Root from './app/container/Root'

global.__APP__ = true;
global.__ANDROID__ = false;
global.__IOS__ = true;

AppRegistry.registerComponent('mdslife_doctor_app', () => Root);
