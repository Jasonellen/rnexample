import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUserType: ['userType'],
  setRegisterInfo: ['mobile', 'messageCode', 'password', 'isFormDisabled'],
  setRegisterCountdown: ['countdown'],
  registerMessageCodeRequest: ['mobile'],
  registerMessageCodeSuccess: null,
  registerInfoVerifyRequest: null,
  registerMessageCodeVerifyRequest: null,
  registerMessageCodeVerifySuccess: null
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  type: null,
  mobile: null,
  messageCode: null,
  password: null,
  mobileVerified: false,
  countdown: 0, // 验证码发送间隔倒数
  countdownTime: 0, // 上次验证码发送间隔倒数的毫秒时间戳
  isFormDisabled: true // 表单提交按钮是否不可点
})

/* ------------- Reducers ------------- */

export const setUserType = (state, { userType }) => {
  return state.merge({ type:userType })
}

export const setRegisterInfo = (state, { mobile, messageCode, password, isFormDisabled }) => {
  return state.merge({ mobile, messageCode, password, isFormDisabled })
}

export const setRegisterCountdown = (state, { countdown }) => {
  return state.merge({ countdown, countdownTime: new Date().getTime() })
}

export const messageCodeVerifySuccess = (state) => {
  return state.merge({ mobileVerified: true })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_TYPE]: setUserType,
  [Types.SET_REGISTER_INFO]: setRegisterInfo,
  [Types.SET_REGISTER_COUNTDOWN]: setRegisterCountdown,
  [Types.REGISTER_MESSAGE_CODE_VERIFY_SUCCESS]: messageCodeVerifySuccess
})
