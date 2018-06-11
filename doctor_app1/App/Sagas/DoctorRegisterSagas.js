
import { call, put ,select} from 'redux-saga/effects'
import DoctorRegisterActions from '../Redux/DoctorRegisterRedux'
import StudentRegisterActions from '../Redux/StudentRegisterRedux'
import { Alert } from 'react-native'

let API={
  areaData:()=>{
    return request.get('https://doctor.mdslife.com/api/v1/regions')
  },
  cityData:(id)=>{
    return request.get(`https://doctor.mdslife.com/api/v1/regions?region=${id}`)
  },
  hospitalData:(id)=>{
    return request.get(`https://doctor.mdslife.com/api/v1/hospitals?region=${id}`)
  },
  departmentData:()=>{
    return request.get('https://doctor.mdslife.com/api/v1/departments')
  },
  departmentListData:(id)=>{
    return request.get(`https://doctor.mdslife.com/api/v1/departments?department=${id}`)
  },
  submit:(params)=>{
    return request.post('https://doctor.mdslife.com/api/v1/users/sign_up', params)
  }

}

//地区数据
export function * areaData (action) {
  const response = yield call(API.areaData)
  if(response.regions){
    yield put(DoctorRegisterActions.setAreaData(response.regions))
  }
}

//获取市ID，用来选择医院
const getProId = (state) =>{
    return state.doctorRegister.proId
}
export function * cityData (action) {
  const id = yield select(getProId)
  const response = yield call(API.cityData,id)
  if(response.regions){
    yield put(DoctorRegisterActions.setCityData(response.regions))
  }
}
//地区左边省点击
export function * areaClick (action) {
  const { areaShowIndex, proId, proName, regionId } = action
  const response = yield call(API.cityData,proId)
  if(response.regions){
    yield put(DoctorRegisterActions.setCityData(response.regions))
    yield put(DoctorRegisterActions.setData('areaShowIndex',areaShowIndex))
    yield put(DoctorRegisterActions.setData('proId',proId))
    yield put(DoctorRegisterActions.setData('proName',proName))
    yield put(StudentRegisterActions.studentSetData('regionId',regionId))
  }
}

//获取市ID，用来选择医院
const getCityId = (state) =>{
    return state.doctorRegister.cityId
}

export function * hospitalData (action) {
  const id = yield select(getCityId)
  const response = yield call(API.hospitalData,id)
  if(response.hospitals){
    yield put(DoctorRegisterActions.setData('hospitalData',response.hospitals))
  }
}

//科室数据
export function * departmentData (action) {
  const response = yield call(API.departmentData)
  if(response.departments){
    yield put(DoctorRegisterActions.setData('departmentData',response.departments))
  }
}

const getDepartmentId = (state) =>{
    return state.doctorRegister.departmentId
}
export function * departmentListData (action) {
  const id = yield select(getDepartmentId)
  const response = yield call(API.departmentListData,id)
  if(response.departments){
    yield put(DoctorRegisterActions.setData('departmentListData',response.departments))
  }
}
//地区科室点击
export function * departmentClick (action) {
  const { departmentShowIndex, id } = action
  const response = yield call(API.departmentListData,id)
  if(response.departments){
    yield put(DoctorRegisterActions.setData('departmentListData',response.departments))
    yield put(DoctorRegisterActions.setData('departmentShowIndex',departmentShowIndex))
    yield put(DoctorRegisterActions.setData('departmentId',id))
  }
}

//点击提交注册
//获取市ID，用来选择医院
const getSubmitData = (state) =>{
    return state.doctorRegister.submitData
}
export function * submit (action) {
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
