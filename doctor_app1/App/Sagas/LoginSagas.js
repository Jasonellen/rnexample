import { put,select,call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
const selectState = (state) => state.login

let API={
	check_mobile_exist:(username)=>{
		return request.postForm('https://doctor.mdslife.com/api/v1/users/check_mobile_exist', `mobile=${username}`)
	},
	get_token:(username,password)=>{
		return request.get(`https://doctor.mdslife.com/api/v1/users/login?mobile=${username}&password=${password}`)
	},
	get_user:(token)=>{
		return request.get(`https://doctor.mdslife.com/api/v1/users/current_user?token=${token}`)
	}
}
//发起登录请求
export function * loginRequest (action) {
	const data = yield select(selectState)
	const { username, password } = data

    const check = yield call(API.check_mobile_exist, username)
    // 如果用户名存在继续 (ok是不存在)
    if(check.user.message !== 'ok'){
    	yield put(LoginActions.getToken(username, password))
    }else{
    	alert('账号或密码错误')
    } 
}
//获取用户token
export function * getToken (action) {
	const { username, password } = action
	const get_token = yield call(API.get_token,username,password)
	if(get_token.user.token){
		yield put(LoginActions.getUser(get_token.user.token))
	}
}
//获取用户信息
export function * getUser (action) {
	const { token } = action
	const get_user = yield call(API.get_user,token)
	if(get_user.ID){
		alert('登录成功，可以跳转 Webview 了')
	}else{
		alert('登录失败')
	}
}


