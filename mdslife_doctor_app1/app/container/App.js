/**
 * Created by DB on 2017/2/16.
 */
import React, {Component, PureComponent} from 'react';
import {
    View,
    Text,
    Button,
    Platform
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'

import TabBarView from './TabBarView';

import WebViewApp from '../page/WebViewApp'
import Login from '../page/Login/LoginView'

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{flex:1}}>
                <Navigator {...this.props}
                           initialRoute={{name: 'WebViewApp', component: WebViewApp}}
                           configureScene={(route) => {
                               if (Platform.OS === 'android') {
                                   if (route.sceneConfig) {
                                       return ({
                                           ...route.sceneConfig,
                                           gestures: null
                                       })
                                   } else {
                                       return ({
                                           ...Navigator.SceneConfigs.PushFromRight,
                                           gestures: null
                                       })
                                   }

                               } else {
                                   if (route.sceneConfig) {
                                       return ({
                                           ...route.sceneConfig,
                                           gestures: route.gestures
                                       })
                                   } else {
                                       return Navigator.SceneConfigs.PushFromRight
                                   }
                                  // return route.sceneConfig || Navigator.SceneConfigs.PushFromRight;
                               }
                           }}
                           renderScene={(route, navigator) => {
                               let Component = route.component;
                               return (
                                   <Component navigator={navigator}
                                              route={route}
                                              {...route.params}
                                              {...this.props}
                                   />
                               )
                           }}
                />
            </View>
        )
    }
}
