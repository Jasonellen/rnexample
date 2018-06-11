import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  schoolSetInitialState: ['data'],
  studentSetData:['key','value'],
  updateSchoolSubmitData:['key','value'],
  areaData:['areaData'],
  cityData:['id'],
  schoolData:null,
  setAreaData:['areaData'],
  setCityData:['cityData'],
  areaClick:['areaShowIndex','proId','proName', 'regionId'],
  areaClickRight:['cityName','cityId'],
  schoolClick:['name','id'],

  departmentListClick:['departmentName','id'],
  s_submit:null
})

export const StudentRegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  //模态框
  areaModal: false,
  schoolModal: false,
  departmentModal: false,
  educationModal: false,
  //各个列表显示的值
  areaName: '请输入地区',
  schoolName: '请输入学校',
  departmentName: '请输入专业',
  educationName: '请输入学历',
  //列表数据
  schoolData:'',
  //发送数据参数
  submitData: {
    mobile:'',
    type:'',
    password:"",
    name: '',
    region: '',
    school: '',
    department: '',
    title: ''
  },

  //选择地区
  proName: '北京市',
  proId: '10',  // 省id
  cityId: '1',
  regionId: '1',

  //选择部门
  departmentShowIndex: '0', // 当前显示的index
  departmentId: '1',  // 科室id
  //选择学校
  schoolShowIndex: '0',
  //其他
  iptShow:false,
  iptValue:'',
  educationShowIndex:'0'

})

/* ------------- Reducers ------------- */

// request the data from an api
export const schoolSetInitialState = (state, { data }) =>{
  const submitData = Object.assign({}, state.submitData, data)
  return state.merge({ submitData: submitData })
}

export const studentSetData = (state, action) =>{
  const { key,value } = action
  return state.merge({ [key]: value })
}
export const updateSchoolSubmitData = (state, action) =>{
  const { key,value } = action
  return Immutable.setIn( state,['submitData',key], value )
}

export const areaClickRight = (state, action) =>{
  const { cityName, cityId } = action
  const submitData = Object.assign({}, state.submitData, {region:cityId})
  return state.merge({ areaName:cityName, cityId, areaModal:false, submitData: submitData })
}
export const schoolClick = (state, action) =>{
  const { name, id } = action
  const submitData = Object.assign({}, state.submitData, {school:id})
  return state.merge({ schoolName:name, schoolModal:false, submitData: submitData })
}

export const departmentListClick = (state, action) =>{
  const { departmentName, id } = action
  const submitData = Object.assign({}, state.submitData, {department:id})
  return state.merge({ departmentName, departmentModal:false, submitData: submitData })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SCHOOL_SET_INITIAL_STATE]: schoolSetInitialState,
  [Types.STUDENT_SET_DATA]: studentSetData,
  [Types.UPDATE_SCHOOL_SUBMIT_DATA]: updateSchoolSubmitData,
  [Types.AREA_CLICK_RIGHT]: areaClickRight,
  [Types.SCHOOL_CLICK]: schoolClick,
  [Types.DEPARTMENT_LIST_CLICK]: departmentListClick,
})
