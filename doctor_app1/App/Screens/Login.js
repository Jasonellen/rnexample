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
import { Images } from '../Themes'
import * as WeChat from 'react-native-wechat'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
//action
import LoginActions from '../Redux/LoginRedux'
// Styles
import styles from './Styles/LoginStyle'

class Login extends React.Component {

  _handleSubmit () {
    this.userNameInput.blur()
    this.passwordInput.blur()
    this.props.loginRequest()
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
  }
  render () {
    let { username, password,usernameVerify,passwordVerify } = this.props.state
    let checked = usernameVerify && passwordVerify

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
                  onChangeText={value => {this.props.changeUserInfo('username',value)}}
                  autoFocus
                  placeholder='请输入您的手机号'
                  returnKeyType='next'
                  onSubmitEditing={() => this.passwordInput.focus()}
                  enablesReturnKeyAutomatically />
                  {
                    usernameVerify?null:<Text style={styles.error}>请输入正确的手机号码</Text>
                  }
                <TextInput
                  ref={component => { this.passwordInput = component }}
                  style={[styles.formItem, styles.formInput]}
                  onChangeText={value => {this.props.changeUserInfo('password',value)}}
                  placeholder='请输入密码'
                  returnKeyType='go'
                  onSubmitEditing={() => this._handleSubmit()}
                  enablesReturnKeyAutomatically
                  secureTextEntry />
                  {
                    passwordVerify?null:<Text style={styles.error}>请输入正确的密码(6-16位)</Text>
                  }
                <Button
                  style={[styles.formItem, styles.formSubmit]}
                  textStyle={styles.formSubmitText}
                  isDisabled={checked}
                  onPress={() => this.props.loginRequest()}>
                  登录
                </Button>
                <View style={styles.footer}>
                  <TouchableHighlight
                    onPress={() => Actions.newUser()} >
                    <Text style={styles.footerTitle}>注册新账号</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this.props.onForget} >
                    <Text
                      style={styles.footerTitle}
                      onPress={()=>alert('功能尚未开通')}
                    >忘记密码？</Text>
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

const mapStateToProps = (state) => {
  console.tron.log(state)
  return {
    state: state.login
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  loginRequest: () => dispatch(LoginActions.loginRequest()),
  changeUserInfo: (key,value) => dispatch(LoginActions.changeUserInfo(key,value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
