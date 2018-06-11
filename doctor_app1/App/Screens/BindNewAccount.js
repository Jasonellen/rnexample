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
import request from '../Services/request'
// Styles
import styles from './Styles/BindNewAccountStyle'

class BindNewAccount extends React.Component {

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

  componentDidMount () {
    request.post('https://doctor.mdslife.com/api/v1/users/check_mobile_exist', {mobile: 13135503394})
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderStatusBar()}
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.title}>没有账号?请填写以下信息,创建麦迪森账号,下次就可以使用微信快速登录了哦</Text>
          <TextInput
            placeholder='请输入您的手机号'
            placeholderTextColor='#666'
            underlineColorAndroid='transparent'
            style={styles.phoneIpt}
          />
          <View style={styles.verifyBox}>
            <TextInput
              placeholder='请输入验证码'
              placeholderTextColor='#666'
              underlineColorAndroid='transparent'
              style={styles.verifyIpt}
            />
            <Text style={styles.sendMessage}>获取验证码</Text>
          </View>
          <TextInput
            placeholder='请设置密码(6-16位)'
            placeholderTextColor='#666'
            underlineColorAndroid='transparent'
            style={styles.verifyIpt}
          />
          <TouchableOpacity>
            <Text style={styles.bindNew}>绑定新账号</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.hadAccount}>已有账号</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default BindNewAccount
