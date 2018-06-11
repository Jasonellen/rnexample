// @flow

import React from 'react'
import {
  Text,
  KeyboardAvoidingView,
  View,
  StatusBar,
  Image,
  TextInput,
  Platform
} from 'react-native'

import Button from 'apsl-react-native-button'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// external libs

// Styles
import styles from './Styles/ForgetPasswordStyle'

var t = require('tcomb-form-native')

var Form = t.form.Form

import { Mobile } from './../Lib/Validator'

// here we are: define your domain model
var Person = t.struct({
  user_mobile: Mobile,              // a required string
  checknum: t.Number,
  password: t.String
})

class ForgetPassword extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: {
        user_mobile: '',
        checknum: '',
        password: ''
      },
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
    var value = this.refs.form.getValue()

    if (value) { // if validation fails, value will be null
      this.props.onSubmit()
    }
  }

  onFormChange (value) {
    if (this.refs.form.validate().isValid()) {
      this.setState({isFormDisabled: false})
    }

    this.setState({value})
  }

  onRequestChecknum () {
    let times = 5

    this.setState({checknumText: times, isChecknumDisabled: true})

    this.timer = setInterval(() => {
      times--

      this.setState({checknumText: times})

      if (times <= 0) {
        clearInterval(this.timer)
        this.setState({checknumText: '短信验证', isChecknumDisabled: false})
      }
    }, 1000)
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
            placeholder={locals.placeholder} />
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
          maxLength: 11
        },
        checknum: {
          template: this.renderChecknum.bind(this),
          maxLength: 4,
          placeholder: '请输入验证码',
          error: '请输入正确的验证码'
        },
        password: {
          placeholder: '请输入新密码',
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
                  重设密码
                </Button>
                <View style={styles.footer}>
                  <Text style={styles.footerTitle}>验证码十分钟内有用</Text>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Image>
    )
  }
}

export default ForgetPassword
