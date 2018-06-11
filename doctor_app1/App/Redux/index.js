import { combineReducers } from 'redux'
import configureStore, { configureMeetingStore } from './CreateStore'
import rootSaga from '../Sagas/'

/**
 * 视频会议所需的reducer
 */
import {
    ReducerRegistry
} from './../../react/features/base/redux'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    register: require('./RegisterRedux').reducer,
    doctorRegister: require('./DoctorRegisterRedux').reducer,
    studentRegister: require('./StudentRegisterRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}

export const createMeetingStore = () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    ...ReducerRegistry._elements
  })

  return configureMeetingStore(rootReducer)
}
