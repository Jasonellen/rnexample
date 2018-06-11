// @flow

import React from 'react'
import {
  Text,
  KeyboardAvoidingView,
  View,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Platform
} from 'react-native'

import Button from 'apsl-react-native-button'
import request from '../Services/request'
import { Images } from '../Themes'
import * as WeChat from 'react-native-wechat'
// external libs

// Styles
import styles from './Styles/LoginStyle'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      userName: '',
      password: ''
    }
  }

  _handleSubmit () {
    let {userName, password} = this.state
    if (!userName.length) {
      Alert.alert('提示', '请输入用户名')
      return
    }

    if (!password.length) {
      Alert.alert('提示', '请输入密码')
      return
    }
    this.userNameInput.blur()
    this.passwordInput.blur()
    request.postForm('https://doctor.mdslife.com/api/v1/users/check_mobile_exist', `mobile=${userName}`)
      .then((data) => {
        console.log(data)
        if (data.user.message !== 'ok') { // 如果用户名不存在继续 (ok是不存在)
          new Promise((resolve, reject) => {
            request.get(`https://doctor.mdslife.com/api/v1/users/login?mobile=${userName}&password=${password}`)
              .then((data) => {
                if (data.user.token) {
                  resolve(data)
                } else {
                  Alert.alert('账号或密码错误')
                }
              })
          })
            .then((data) => {
              request.get(`https://doctor.mdslife.com/api/v1/users/current_user?token=${data.user.token}`)
                .then((data) => {
                  if (data.mobile === this.state.userName) {
                    // 跳转到webview
                    Alert.alert('登录成功,请跳转到webview')
                  } else {
                    Alert.alert('账号或密码错误')
                  }
                })
            })
        } else {
          Alert.alert('用户名不存在,请先注册')
        }
      })
    // this.props.onSubmit()
  }

  renderStatusBar () {
    if (Platform.OS === 'ios') {
      return (
        <StatusBar
          barStyle='dark-content' />
      )
    } else {
      return null
    }
  }
  /*
   * 微信登录测试
   * AppSecret = '46686c2c594cf7f27d1377df386aaecc'
   * WECHAT_APP_ID ='wx6baabfbf39121b5b'
   * */
  WXLogin () {
    let AppSecret = '46686c2c594cf7f27d1377df386aaecc'
    let appId = 'wx6baabfbf39121b5b'
    return (
      <TouchableOpacity
        onPress={() => {
          WeChat.isWXAppInstalled()
            .then((isInstalled) => {
              if (isInstalled) {
                WeChat.sendAuthRequest('snsapi_userinfo')
                  .then((data) => {
                    request.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${AppSecret}&code=${data.code}&grant_type=authorization_code`)
                      .then((data) => {
                        request.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}`)
                          .then((data) => {
                            /* 用户微信头像data.headimgurl,
                               用户唯一标示 data.unionid,
                               用户唯一标示 data.nickname */
                            console.log(data)
                          })
                      })
                  })
              }
            })
        }}
      >
        <Text>{this.state.name}</Text>
      </TouchableOpacity>
    )
  }
  render () {
    let { userName, password } = this.state
    let isDisabled = !userName || !password

    return (
      <Image source={Images.loginBg} style={styles.backgroundImage}>
        {this.renderStatusBar()}
        <View style={styles.mainContainer}>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.container}>
              <View style={styles.top}>
                <Image
                  style={styles.avatar}
                  source={Images.logo} />
              </View>
              <View style={styles.form}>
                <TextInput
                  ref={component => { this.userNameInput = component }}
                  style={[styles.formItem, styles.formInput]}
                  onChangeText={text => this.setState({ userName: text })}
                  autoFocus
                  placeholder='请输入您的手机号'
                  returnKeyType='next'
                  onSubmitEditing={() => this.passwordInput.focus()}
                  enablesReturnKeyAutomatically />
                <TextInput
                  ref={component => { this.passwordInput = component }}
                  style={[styles.formItem, styles.formInput]}
                  onChangeText={text => this.setState({ password: text })}
                  placeholder='请输入密码'
                  returnKeyType='go'
                  onSubmitEditing={() => this._handleSubmit()}
                  enablesReturnKeyAutomatically
                  secureTextEntry />
                <Button
                  style={[styles.formItem, styles.formSubmit]}
                  textStyle={styles.formSubmitText}
                  isDisabled={isDisabled}
                  onPress={() => this._handleSubmit()}>
                  登录
                </Button>
                <View style={styles.footer}>
                  <TouchableHighlight
                    onPress={this.props.onNewUser} >
                    <Text style={styles.footerTitle}>注册新账号</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this.props.onForget} >
                    <Text style={styles.footerTitle}>忘记密码？</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.otherLogin}>
                  <View style={styles.lineBox}>
                    <View style={styles.lines} />
                    <Text style={styles.lineText}>其他登录方式</Text>
                  </View>
                  <TouchableHighlight onPress={this.WXLogin}>
                    <Image source={Images.wechat} style={styles.wechat} />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Image>
    )
  }
}

export default Login
