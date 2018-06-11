/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react'
import {
    StyleSheet,
    WebView,
    BackHandler,
    View,
    Platform,
    DeviceEventEmitter,
    StatusBar,
    ToastAndroid
} from 'react-native'

import X5WebView from 'react-native-x5'

import { Navigator } from 'react-native-deprecated-custom-components'
import Meeting from './Meeting'

import JsConfig from '../config/jsConfig'
import UrlConfig from '../config/UrlConfig'

import Nav from '../commons/NavigationBar'
import *as Toast from '../commons/Toast'
import WeChatShare from '../commons/WeChatShare'

class WebViewApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            isShowCanGoBack: false
        };

        this.canGoBack = false;
        this.url = ''

        global.mettingCount = 1;

    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.goBack);

        if (__ANDROID__) {
            X5WebView.getX5CoreVersion(function callback (version) {
                console.log(version); // get `0` if X5 is not installed correctly
            });
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack)
    }

    onNavigationStateChange = (navState) => {

        console.log(JSON.stringify(navState));

        this.setState({
            isShowCanGoBack: navState.canGoBack
        });

        if (!navState.title) {
            return
        }

        let host = JsConfig.API_HOST;
        if (navState.title.indexOf(host) !== -1) {
            this.canGoBack = false;
            return;
        }

        this.setState({
            title: navState.title
        });

        if (!navState.loading) {
            this.canGoBack = navState.canGoBack;
        }

        if (navState.url.endsWith('/home/meeting') || navState.url.endsWith('/home/meeting/')) {

            if (global.mettingCount === 1) {
                console.log('进入会议');
                // this.webview.goBack();

                const {navigator} = this.props;
                navigator.push({
                    component: Meeting,
                    sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                    gestures: null,
                    params: {}
                });

                global.mettingCount = 2;
            }
        }
    };

    handlerMeeting = () => {
        const {navigator} = this.props;
        navigator.push({
            component: Meeting,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            gestures: null,
            params: {}
        });
    }

    goBack = () => {

        if (this.canGoBack) {
            this.webview.goBack();
            return true
        } else {

            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            } else {
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', 500);
                return true;
            }
        }

    };

    // renderLoading() {
    //     const loadingText = 'v' + JsConfig['VERSION_NAME'][Platform.OS] + ' 加载中'
    //     return <LoadingView desc={loadingText}/>
    // }
    //
    // renderError(domain, code, message) {
    //     return <LoadingErrorView
    //         errorDomain={domain}
    //         errorCode={code}
    //         errorDesc={message}
    //     />
    // }

    onWeChathShare = () => {
        this.shareView.openModal()
    }

    renderWebViewAndroid() {
        return (
            <X5WebView
                ref={(ref) => {
                    this.webview = ref
                }}
                automaticallyAdjustContentInsets={false}
                style={styles.base}
                source={{uri: UrlConfig.login, headers: {'X-Application-Platform': Platform.OS}}}
                javaScriptEnabled
                domStorageEnabled
                scalesPageToFit
                decelerationRate='normal'
                onNavigationStateChange={this.onNavigationStateChange}
                // onLoad={this.onload}
                // renderLoading={this.renderLoading}
                // renderError={this.renderError}
            />
        )
    }

    renderWebViewIOS() {
        return (
            <WebView
                ref={(ref) => {
                    this.webview = ref
                }}
                bounces={false}
                automaticallyAdjustContentInsets={false}
                style={styles.base}
                source={{uri: UrlConfig.login, headers: {'X-Application-Platform': Platform.OS}}}
                javaScriptEnabled
                domStorageEnabled
                scalesPageToFit
                decelerationRate='normal'
                onShouldStartLoadWithRequest={() => {
                    const shouldStartLoad = true
                    return shouldStartLoad
                }}
                onNavigationStateChange={this.onNavigationStateChange}
                // onLoad={this.onload}
                // renderLoading={this.renderLoading}
                // renderError={this.renderError}
            />
        )
    }

    renderWebView() {
        if (Platform.OS === 'ios') {
            return this.renderWebViewIOS()
        } else {
            return this.renderWebViewAndroid()
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content' />
                <Nav
                    title={this.state.title}
                    onLeftButtonPress={this.goBack}
                    showLeftDefault={this.state.isShowCanGoBack}
                    // onRightButtonPress={this.onWeChathShare}
                    onRightButtonPress={this.handlerMeeting}
                />
                {this.renderWebView()}
                <WeChatShare
                    ref={w => this.shareView = w}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
});

export default WebViewApp
