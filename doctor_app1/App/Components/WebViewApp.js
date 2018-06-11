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
  WebView,
  BackAndroid,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Platform
} from 'react-native'

import WebViewAndroid from 'react-native-webview-crosswalk'

import JsConfig from '../Config/JsConfig'

import NavItems from '../Navigation/NavItems'
import { Actions } from 'react-native-router-flux'
import * as WeChat from 'react-native-wechat'
import { toastShort } from '../Lib/ToastUtil'
import LoadingView from '../Components/LoadingView'
import LoadingErrorView from '../Components/LoadingErrorView'
import Storage from '../Lib/Storage'
import { formatStringWithHtml } from '../Lib/FormatUtil'

import styles from './Styles/WebViewAppStyle'

import { Images } from '../Themes'

const shareIconWechat = Images.shareIconWechat
const shareIconMoments = Images.shareIconMoments

class WebViewApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShareModal: false
    }
    this.canGoBack = false
    this.url = this.props.lastUrl || ''
    this.title = this.props.title || ''
    this.onActionSelected = this.onActionSelected.bind(this)
    this.goBack = this.goBack.bind(this)
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)
    this.onIconClicked = this.onIconClicked.bind(this)

    this.renderLeftButton = this.renderLeftButton.bind(this)
    this.renderRightButton = this.renderRightButton.bind(this)
  }

  componentDidMount () {
    Actions.refresh({
      title: this.title,
      renderLeftButton: this.renderLeftButton,
      renderRightButton: this.renderRightButton
    })
    BackAndroid.addEventListener('hardwareBackPress', this.goBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack)
  }

  onIconClicked () {
    this.goBack()
  }

  renderLeftButton () {
    if (this.canGoBack) {
      return NavItems.backButton(this.goBack)
    } else {
      return null
    }
  }

  renderRightButton () {
    return NavItems.shareButton(this.onActionSelected)
  }

  onActionSelected () {
    this.setState({
      isShareModal: true
    })
  }

  onNavigationStateChange (navState) {
    if (!navState.title) {
      return
    }

    let host = JsConfig.API_HOST
    if (navState.title.indexOf(host) !== -1) {
      // title 为 url (例如：doctor.mdslife.com) 时，不作处理
      return
    }

    // onLoadStart
    if (this.props.onWebViewUrlChange) {
      this.props.onWebViewUrlChange(navState.url)
    }

    if (navState.title) {
      if (this.props.shouldSaveBrowsingHistory) {
        if (!this.props.shouldSaveBrowsingHistory(navState.url)) {
          return
        };
      }

      if (!navState.loading) {
        this.canGoBack = navState.canGoBack
        this.url = navState.url

        if (!this.url.endsWith('/agreements/doctor_register') && !this.url.endsWith('/users/new') && !this.url.endsWith('/users/forgot_password')) {
          Storage.save('lastUrl', navState.url)
        }

        Actions.refresh({
          title: navState.title
        })
      }
    }
  }

  goBack () {
    if (this.state.isShareModal) {
      this.setState({
        isShareModal: false
      })
      return true
    } else if (this.canGoBack) {
      this.webview.goBack()
      return true
    }

    // 返回 false，则退出app
    // docs: http://facebook.github.io/react-native/docs/backandroid.html
    return false
  }

  renderLoading () {
    const loadingText = 'v' + JsConfig['VERSION_NAME'][Platform.OS] + ' 加载中'
    return <LoadingView desc={loadingText} />
  }

  renderError (domain, code, message) {
    return <LoadingErrorView
      errorDomain={domain}
      errorCode={code}
      errorDesc={message}
            />
  }

  renderSpinner () {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            isShareModal: false
          })
        }}
      >
        <View
          key={'spinner'}
          style={styles.spinner}
        >
          <View style={styles.spinnerContent}>
            <Text style={[styles.spinnerTitle, { fontSize: 20, color: 'black' }]}>
              分享到
            </Text>
            <View style={styles.shareParent}>
              <TouchableOpacity
                style={styles.base}
                onPress={() => {
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToSession({
                          title: formatStringWithHtml(this.title),
                          description: '分享自：' + JsConfig.HOST_TITLE,
                          thumbImage: JsConfig.API_HOST + '/assets/login/logo-11a894df3ae08446266fcb79d52f47a131be97999be1867baf5f4caecae496ea.png',
                          type: 'news',
                          webpageUrl: this.url
                        })
                        .catch((error) => {
                          toastShort(error.message, true)
                        })
                      } else {
                        toastShort('没有安装微信软件，请您安装微信之后再试', true)
                      }
                    })
                }}
              >
                <View style={styles.shareContent}>
                  <Image
                    style={styles.shareIcon}
                    source={shareIconWechat}
                  />
                  <Text style={styles.spinnerTitle}>
                    微信
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.base}
                onPress={() => {
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToTimeline({
                          title: formatStringWithHtml(`[@mdslife]${this.title}`),
                          thumbImage: JsConfig.API_HOST + '/assets/login/logo-11a894df3ae08446266fcb79d52f47a131be97999be1867baf5f4caecae496ea.png',
                          type: 'news',
                          webpageUrl: this.url
                        })
                        .catch((error) => {
                          toastShort(error.message, true)
                        })
                      } else {
                        toastShort('没有安装微信软件，请您安装微信之后再试', true)
                      }
                    })
                }}
              >
                <View style={styles.shareContent}>
                  <Image
                    style={styles.shareIcon}
                    source={shareIconMoments}
                  />
                  <Text style={styles.spinnerTitle}>
                    朋友圈
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderWebviewAndroid () {
    return (
      <WebViewAndroid
        ref={(ref) => { this.webview = ref }}
        automaticallyAdjustContentInsets={false}
        style={styles.base}
        source={{ uri: this.props.lastUrl, headers: { 'X-Application-Platform': Platform.OS } }}
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit
        decelerationRate='normal'
        onShouldStartLoadWithRequest={() => {
          const shouldStartLoad = true
          return shouldStartLoad
        }}
        onNavigationStateChange={this.onNavigationStateChange}
        onLoad={this.onload}
        renderLoading={this.renderLoading}
        renderError={this.renderError}
      />
    )
  }

  renderWebviewIOS () {
    return (
      <WebView
        ref={(ref) => { this.webview = ref }}
        automaticallyAdjustContentInsets={false}
        style={styles.base}
        source={{ uri: this.props.lastUrl, headers: { 'X-Application-Platform': Platform.OS } }}
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit
        decelerationRate='normal'
        onShouldStartLoadWithRequest={() => {
          const shouldStartLoad = true
          return shouldStartLoad
        }}
        onNavigationStateChange={this.onNavigationStateChange}
        onLoad={this.onload}
        renderLoading={this.renderLoading}
        renderError={this.renderError}
      />
    )
  }

  renderWebView () {
    if (Platform.OS === 'ios') {
      return this.renderWebviewIOS()
    } else {
      return this.renderWebviewAndroid()
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType='fade'
          visible={this.state.isShareModal}
          transparent
          onRequestClose={() => {
            this.setState({
              isShareModal: false
            })
          }}
        >
          {this.renderSpinner()}
        </Modal>
        {this.renderWebView()}
      </View>
    )
  }
}

export default WebViewApp
