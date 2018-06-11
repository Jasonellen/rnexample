// @flow

import React from 'react'
import {
  Text,
  KeyboardAvoidingView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native'

import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux'

// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// external libs

// Styles
import styles from './Styles/RegisterStyle'
import request from '../Services/request'
var t = require('tcomb-form-native')

var Form = t.form.Form

import { Mobile } from '../Lib/Validator'

// here we are: define your domain model
var Person = t.struct({
  user_mobile: Mobile,              // a required string
  checknum: t.Number,
  password: t.String,
})

class Register extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: {
        user_mobile: '',
        checknum: '',
        password: '',
      },
      type: props.dataType,
      checknumHasError: false,
      passwordHasError: false,
      checknumText: '短信验证',
      isChecknumDisabled: false,
      isFormDisabled: true
    }
  }

  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  onPress () {
    // call getValue() to get the values of the form
    var value = Object.assign({}, this.refs.form.getValue(), {type: this.state.type})

    if (value) { // if validation fails, value will be null
      console.log(value) // value here is an instance of Person
    }
    request.postForm('https://doctor.mdslife.com/api/v1/users/check_mobile_exist', `mobile=${value.user_mobile}`)
      .then((data) => {
        if (data.user.message === 'ok') { // ok是不存在
          request.postForm('https://doctor.mdslife.com/api/v1/messages/check_message_code', `mobile=${value.user_mobile}&code=${value.checknum}`)
            .then((data) => {
              if (data.message.message === 'ok') {
                switch (this.state.type) {
                  case 'Doctor':
                    Actions.doctorRegister({message: value})
                    break
                  case 'Student':
                    Actions.studentRegister({message: value})
                    break
                  case 'Visitor':
                    Actions.visitorRegister({message: value})
                    break
                }
              } else {
                Alert.alert('验证码有误')
              }
            })
        } else {
          Alert.alert('用户名已存在,请直接登录')
        }
      })
  }

  onFormChange (value) {
    if (this.refs.form.validate().isValid()) {
      this.setState({isFormDisabled: false})
    }
    this.setState({value})
  }

  onRequestChecknum () {
    let times = 10

    this.setState({checknumText: times, isChecknumDisabled: true})

    this.timer = setInterval(() => {
      times--

      this.setState({checknumText: times})

      if (times <= 0) {
        clearInterval(this.timer)
        this.setState({checknumText: '短信验证', isChecknumDisabled: false})
      }
    }, 1000)
    request.postForm('https://doctor.mdslife.com/api/v1/messages/send_message_code', `mobile=${this.state.value.user_mobile}`)
      .then((data) => {
        console.log(data)
        if (data.message.result !== 'ok') {
          Alert.alert('验证码发送失败')
        }
      })
  }

  renderChecknum (locals) {
    if (locals.hidden) {
      return null
    }

    var stylesheet = locals.stylesheet
    var formGroupStyle = stylesheet.formGroup.normal
    var textboxStyle = stylesheet.textbox.normal
    var textboxViewStyle = stylesheet.textboxView.normal
    var errorBlockStyle = stylesheet.errorBlock

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error
      textboxStyle = stylesheet.textbox.error
      textboxViewStyle = stylesheet.textboxView.error
    }

    if (locals.editable === false) {
      textboxStyle = stylesheet.textbox.notEditable
      textboxViewStyle = stylesheet.textboxView.notEditable
    }

    var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion='polite' style={errorBlockStyle}>{locals.error}</Text> : null

    return (
      <View style={formGroupStyle}>
        <View style={[textboxViewStyle, styles.checknumTextboxView]}>
          <TextInput style={[textboxStyle, styles.checknumTextbox]}
            maxLength={locals.maxLength}
            onChangeText={(value) => locals.onChange(value)}
            onChange={locals.onChangeNative}
            placeholder={locals.placeholder}
            autoFocus={locals.autoFocus}
          />
          <Button
            style={styles.checknumButton}
            textStyle={styles.checknumButtonText}
            isDisabled={this.state.isChecknumDisabled}
            onPress={this.onRequestChecknum.bind(this)}>
            {this.state.checknumText}
          </Button>
        </View>
        {error}
      </View>
    )
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

  render () {
    let options = {
      auto: 'placeholders',
      fields: {
        user_mobile: {
          placeholder: '请输入手机号',
          maxLength: 11,
          autoFocus: true
        },
        checknum: {
          template: this.renderChecknum.bind(this),
          maxLength: 4,
          placeholder: '请输入验证码',
          error: '请输入正确的验证码'
        },
        password: {
          placeholder: '请输入密码',
          maxLength: 16,
          error: '密码最少6位最多输入16位'
        }
      }
    } // optional rendering options (see documentation)

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
              <View style={styles.formContainer}>
                <Form
                  ref='form'
                  type={Person}
                  value={this.state.value}
                  options={options}
                  onChange={this.onFormChange.bind(this)}
                />
                <Button
                  style={[styles.formItem, styles.formSubmit]}
                  textStyle={styles.formSubmitText}
                  isDisabled={this.state.isFormDisabled}
                  onPress={this.onPress.bind(this)}>
                  注册
                </Button>
                <View style={styles.footer}>
                  <Text style={styles.footerTitle}>注册即代表您已阅读并同意</Text>
                  <View style={styles.footerLinkContainer}>
                    <TouchableHighlight
                      onPress={this.props.onRegisterAgreements} >
                      <Text style={styles.footerLink}>麦迪森注册协议</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Image>
    )
  }
}

export default Register
