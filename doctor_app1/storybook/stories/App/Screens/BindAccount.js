// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'

// Styles
import styles from './Styles/BindAccountStyle'

class BindAccount extends React.Component {

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
  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderStatusBar()}
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.title}>已有账号?请填写以下信息,创建麦迪森账号,下次就可以使用微信快速登录了哦</Text>
          <TextInput
            placeholder='请输入您的手机号'
            placeholderTextColor='#666'
            underlineColorAndroid='transparent'
            style={styles.phoneIpt}
          />
          <TextInput
            placeholder='请输入密码'
            placeholderTextColor='#666'
            underlineColorAndroid='transparent'
            style={styles.verifyIpt}
          />
          <TouchableOpacity style={styles.press}>
            <Text style={styles.bindNew}>立即绑定</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.press}>
            <Text style={styles.hadAccount}>创建新账号</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default BindAccount
