import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setInitialState: ['data'],
  setData:['key','value'],
  updateSubmitData:['key','value'],
  areaData:null,
  cityData:null,
  hospitalData:null,
  setAreaData:['areaData'],
  setCityData:['cityData'],
  areaClick:['areaShowIndex','proId','proName','regionId'],
  areaClickRight:['cityName','cityId'],
  hospitalClick:['name','id'],
  departmentData:null,
  departmentListData:null,
  departmentClick:['departmentShowIndex','id'],
  departmentListClick:['departmentName','id'],
  submit:null
})

export const DoctorRegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  //模态框
  areaModal: false,
  hospitalModal: false,
  departmentModal: false,
  jobModal: false,
  //各个列表显示的值
  areaName: '请输入地区',
  hospitalName: '请输入医院',
  departmentName: '请输入科室',
  jobName: '请输入职称',
  //列表数据
  areaData:'',
  cityData:'',
  hospitalData:'',
  departmentData:'',
  departmentListData:'',
  //发送数据参数
  submitData: {
    mobile:'',
    type:'',
    password:"",
    name: '',
    region: '',
    hospital: '',
    department: '',
    title: '',
    unionid:'null',
    openid:'null'
  },

  //选择地区
  areaShowIndex: '0', // 当前显示的index
  proName: '北京市',
  proId: '10',  // 省id
  cityId: '1',

  //选择科室
  departmentShowIndex: '0', // 当前显示的index
  departmentId: '1',  // 科室id

  //其他
  iptShow:false,
  iptValue:'',
  jobShowIndex:'0'

})

/* ------------- Reducers ------------- */

// request the data from an api
export const setInitialState = (state, { data }) =>{
  const submitData = Object.assign({}, state.submitData, data)
  return state.merge({ submitData: submitData })
}

export const setData = (state, action) =>{
  const { key,value } = action
  return state.merge({ [key]: value })
}
export const updateSubmitData = (state, action) =>{
  const { key,value } = action
  return Immutable.setIn( state,['submitData',key], value )
}
export const setAreaData = (state, action) =>{
  const { areaData } = action
  return state.merge({ areaData })
}

export const setCityData = (state, action) =>{
  const { cityData } = action
  return state.merge({ cityData })
}
export const areaClickRight = (state, action) =>{
  const { cityName, cityId } = action
  const submitData = Object.assign({}, state.submitData, {region:cityId})
  return state.merge({ areaName:cityName, cityId, areaModal:false, submitData: submitData })
}
export const hospitalClick = (state, action) =>{
  const { name, id } = action
  const submitData = Object.assign({}, state.submitData, {hospital:id})
  return state.merge({ hospitalName:name, hospitalModal:false, submitData: submitData })
}

export const departmentListClick = (state, action) =>{
  const { departmentName, id } = action
  const submitData = Object.assign({}, state.submitData, {department:id})
  return state.merge({ departmentName, departmentModal:false, submitData: submitData })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_INITIAL_STATE]: setInitialState,
  [Types.SET_DATA]: setData,
  [Types.SET_AREA_DATA]: setAreaData,
  [Types.SET_CITY_DATA]: setCityData,
  [Types.UPDATE_SUBMIT_DATA]: updateSubmitData,
  [Types.AREA_CLICK_RIGHT]: areaClickRight,
  [Types.HOSPITAL_CLICK]: hospitalClick,
  [Types.DEPARTMENT_LIST_CLICK]: departmentListClick,
})
