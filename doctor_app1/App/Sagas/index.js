import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { DoctorRegisterTypes } from '../Redux/DoctorRegisterRedux'
import { StudentRegisterTypes } from '../Redux/StudentRegisterRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import { loginRequest, getToken, getUser } from './LoginSagas'
import { getRegisterMessageCode, registerInfoVerifyRequest, verifyRegisterMessageCode } from './RegisterSagas'
import {
    areaData, cityData, areaClick, hospitalData,
    departmentData, departmentListData, departmentClick, submit
} from './DoctorRegisterSagas'

import {
    schoolData, s_submit
} from './StudentRegisterSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // 登录
    takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest),
    takeLatest(LoginTypes.GET_TOKEN, getToken),
    takeLatest(LoginTypes.GET_USER, getUser),
    // 注册前页
    takeLatest(RegisterTypes.REGISTER_MESSAGE_CODE_REQUEST, getRegisterMessageCode, api),
    takeLatest(RegisterTypes.REGISTER_INFO_VERIFY_REQUEST, registerInfoVerifyRequest, api),
    takeLatest(RegisterTypes.REGISTER_MESSAGE_CODE_VERIFY_REQUEST, verifyRegisterMessageCode, api),
    //注册公用方法
    takeLatest(DoctorRegisterTypes.AREA_DATA, areaData),
    takeLatest(DoctorRegisterTypes.CITY_DATA, cityData),
    takeLatest(DoctorRegisterTypes.AREA_CLICK, areaClick),
    takeLatest(DoctorRegisterTypes.DEPARTMENT_DATA, departmentData),
    takeLatest(DoctorRegisterTypes.DEPARTMENT_LIST_DATA, departmentListData),
    takeLatest(DoctorRegisterTypes.DEPARTMENT_CLICK, departmentClick),
    //医生注册
    takeLatest(DoctorRegisterTypes.HOSPITAL_DATA, hospitalData),
    takeLatest(DoctorRegisterTypes.SUBMIT, submit),
    // //学生注册
    takeLatest(StudentRegisterTypes.SCHOOL_DATA, schoolData),
    takeLatest(StudentRegisterTypes.S_SUBMIT, s_submit)
  ]
}
