import JsConfig from './jsConfig'

const apiBaseUrl = JsConfig.API_HOST + '/api/v1';

export default {
    // font scaling override - RN default is on
    registerAgreements: JsConfig.API_HOST + '/agreements/doctor_register',
    baseUrl: JsConfig.API_HOST,
    apiBaseUrl: apiBaseUrl,
    login: JsConfig.API_HOST + '/login',  //登录

}
