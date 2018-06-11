// @flow

import React from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  TouchableHighlight,
  Platform
} from 'react-native'

import BackgroundTimer from 'react-native-background-timer'

import Button from 'apsl-react-native-button'

import TcombFormMessageCode from '../Components/TcombFormMessageCode'

import { Actions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import RegisterActions from '../Redux/RegisterRedux'
import { Images } from '../Themes'
// external libs

// Styles
import styles from './Styles/RegisterStyle'
var t = require('tcomb-form-native')

var Form = t.form.Form

import { Mobile, Password } from '../Lib/Validator'

// here we are: define your domain model
var Person = t.struct({
  mobile: t.maybe(Mobile),
  messageCode: t.maybe(t.Number),
  password: t.maybe(Password)
})

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.onRequestChecknum = this.onRequestChecknum.bind(this)
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }

  onPress () {
    switch (this.props.user.type) {
      case 'Doctor':
        Actions.doctorRegister()
        break
      case 'Student':
        Actions.studentRegister()
        break
      case 'Visitor':
        Actions.visitorRegister()
        break
    }
  }

  onFormChange (value) {
    let isFormDisabled = !this.refs.form.validate().isValid()
    this.props.onChangeRegisterInfo(value.mobile, value.messageCode, value.password, isFormDisabled)
  }

  componentDidMount () {
    let currentTime = new Date().getTime()

    const { countdown, countdownTime } = this.props.user

    if (countdown > 0 && (currentTime - countdownTime) >= 2000) {
      // 2秒内验证码倒数未变化(例如：app奔溃或进程退出)，倒数清0
      let countdown = 0
      this.props.onChangeRegisterCountdown(countdown)
    }
  }

  onRequestChecknum () {
    let countdown = 60

    const intervalId = BackgroundTimer.setInterval(() => {
      let { countdown } = this.props.user

      countdown--

      if (countdown <= 0) {
        BackgroundTimer.clearInterval(intervalId)
      }

      this.props.onChangeRegisterCountdown(countdown)
    }, 1000)

    this.props.onChangeRegisterCountdown(countdown)

    this.props.onSendMessageCode(this.props.user.mobile)
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
        mobile: {
          placeholder: '请输入手机号',
          autoFocus: true
        },
        messageCode: {
          template: TcombFormMessageCode.bind(this, this.props.user.countdown, this.onRequestChecknum),
          maxLength: 4,
          placeholder: '请输入验证码',
          error: '请输入正确的验证码'
        },
        password: {
          placeholder: '请输入密码'
        }
      }
    } // optional rendering options (see documentation)

    let info = {
      mobile: this.props.user.mobile,
      messageCode: this.props.user.messageCode,
      password: this.props.user.password
    }

    return (
      <Image source={Images.loginBg} style={styles.backgroundImage}>
        {this.renderStatusBar()}
        <View style={styles.mainContainer}>
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
                value={info}
                options={options}
                onChange={this.onFormChange.bind(this)}
                />
                <Button
                  style={[styles.formItem, styles.formSubmit]}
                  textStyle={styles.formSubmitText}
                  isDisabled={this.state.isFormDisabled}
                  onPress={() => this.onPress()}>
                  注册
                </Button>
              <View style={styles.footerChoice}>
                <TouchableHighlight
                  onPress={() => Alert.alert('功能尚未开通')} >
                  <Text
                    style={styles.footerChoiceTitle}
                    >忘记密码？</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => Actions.login()} >
                  <Text
                    style={styles.footerChoiceTitle}
                    >已有账户？</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerTitle}>注册即代表您已阅读并同意</Text>
                <View style={styles.footerLinkContainer}>
                  <TouchableHighlight
                    onPress={Actions.registerAgreements} >
                    <Text style={styles.footerLink}>麦迪森注册协议</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Image>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.register
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  onSendMessageCode: (mobile) => dispatch(RegisterActions.registerMessageCodeRequest(mobile)),
  onChangeRegisterInfo: (mobile, messageCode, password, isFormDisabled) => dispatch(RegisterActions.setRegisterInfo(mobile, messageCode, password, isFormDisabled)),
  onRegister: () => dispatch(RegisterActions.registerInfoVerifyRequest()),
  onChangeRegisterCountdown: (countdown) => dispatch(RegisterActions.setRegisterCountdown(countdown))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
