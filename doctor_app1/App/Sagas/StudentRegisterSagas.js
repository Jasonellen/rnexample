
import { call, put ,select} from 'redux-saga/effects'
import StudentRegisterActions from '../Redux/StudentRegisterRedux'
import { Alert } from 'react-native'

let API={
  schoolData:(id)=>{
    return request.get(`https://doctor.mdslife.com/api/v1/schools?region_id=${id}`)
  },
  submit:(params)=>{
    return request.post('https://doctor.mdslife.com/api/v1/users/sign_up', params)
  }
}

//获取市Id，用来选择学校
const getCityId = (state) =>{
  return state.studentRegister.regionId
}

export function * schoolData (action) {
  const id = yield select(getCityId)
  const response = yield call(API.schoolData,id)
  if(response.schools){
    yield put(StudentRegisterActions.studentSetData('schoolData',response.schools))
  }
}

//点击提交注册
//获取市ID，用来选择医院
const getSubmitData = (state) =>{
    return state.studentRegister.submitData
}
export function * s_submit (action) {
  let params = {}
  let onOff = true
  const user = yield select(getSubmitData)

  for( let item in user){
    if( !user[item] || String(user[item]).indexOf('输入')>0){
      Alert.alert('请输入完整信息')
      onOff = false
      break;
    }
  }
  if(onOff){
    params.user = user
    const response = yield call(API.submit,params)
    if (response.user.message === 'ok') {
      Alert.alert('注册成功,跳转webview')
    } else {
      Alert.alert('注册失败,请稍后再试')
    }
  }
}
