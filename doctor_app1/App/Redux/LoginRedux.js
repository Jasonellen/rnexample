import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Regexp from '../Services/Regexp'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  changeUserInfo: ['key','value'],
  getToken:['username', 'password'],
  getUser:['token']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: '',
  password: '',
  usernameVerify:true,
  passwordVerify:true
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const changeUserInfo = (state,action) => {
  const { key,value } = action
  if(key=='username'){
	if(Regexp.isPhone(value)){
		return state.merge({ [key]:value,usernameVerify:true })
	}else{
		return state.merge({ [key]:value,usernameVerify:false })
	}
  }else{
	if(Regexp.isPassword(value)){
		return state.merge({ [key]:value,passwordVerify:true })
	}else{
		return state.merge({ [key]:value,passwordVerify:false })
	}
  }
  // return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_USER_INFO]: changeUserInfo
})


