/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import { Alert } from 'react-native'

/* ------------- Selectors ------------- */
const registerSelector = (state) => state.register

/*
 * 获取短信验证码
 */
export function * getRegisterMessageCode (api, action) {
  const { mobile } = action
  // make the call to the api
  const response = yield call(api.getRegisterMessageCode, mobile)

  // success?
  if (response.ok) {
    if (response.data.message.result === 'ok') {
      yield put(RegisterActions.registerMessageCodeSuccess())
    } else {
      Alert.alert('验证码发送失败')
    }
  } else {
      // 验证码倒数读秒停止
      let countdown = 0
      yield put(RegisterActions.setRegisterCountdown(countdown))
      Alert.alert('验证码发送失败')
  }
}

/*
 * 注册信息验证，包括手机号及验证码
 */
export function * registerInfoVerifyRequest (api, action) {
  const data = yield select(registerSelector)
  const { mobile } = data

  // make the call to the api
  const response = yield call(api.verifyRegisterMobile, mobile)

  // success?
  if (response.ok) {
    if (response.data.user.message === 'ok') {
      // 请求匹配手机号与验证码
      yield put(RegisterActions.registerMessageCodeVerifyRequest())
    } else {
      Alert.alert('用户名已存在,请直接登录')
    }
  }
}

/*
 * 验证短信验证码是否有效
 */
export function * verifyRegisterMessageCode (api, action) {
  const data = yield select(registerSelector)
  const { mobile, messageCode } = data

  // make the call to the api
  const response = yield call(api.verifyRegisterMessageCode, mobile, messageCode)

  // success?
  if (response.ok) {
    if (response.data.message.message === 'ok') {
      yield put(RegisterActions.registerMessageCodeVerifySuccess())
    } else {
      Alert.alert('验证码有误')
    }
  }
}
