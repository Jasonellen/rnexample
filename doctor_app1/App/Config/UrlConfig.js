import JsConfig from '../Config/JsConfig'

export default {
  // font scaling override - RN default is on
  registerAgreements: JsConfig.API_HOST + '/agreements/doctor_register',
  baseUrl: JsConfig.API_HOST,
  apiBaseUrl: JsConfig.API_HOST + '/api/v1'
}
