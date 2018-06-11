/**
 * Created by DB on 16/9/18.
 */
import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
// import App from '../Test/App';
// import {App} from '../../jitsi_meet/react/features/app'

import {configureStore} from '../store/configureStore';

const store = configureStore();

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
} else {
    global.log = global.console.log;
}

import SplashScreen from 'react-native-smart-splash-screen'

export default class root extends React.Component {

  componentDidMount() {
      SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
      });
  }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}