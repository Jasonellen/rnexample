import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'

/**
 * 视频会议所需的redux中间件
 */
import Thunk from 'redux-thunk'
import {
    MiddlewareRegistry
} from './../../react/features/base/redux'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)
  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}

// 创建视频会议store
export const configureMeetingStore = (rootReducer) => {
  const enhancers = []

  /* ------------- Assemble Middleware ------------- */

  // 包括视频会议所需中间件
  // Apply all registered middleware from the MiddlewareRegistry + additional
  // 3rd party middleware:
  // - Thunk - allows us to dispatch async actions easily. For more info
  // @see https://github.com/gaearon/redux-thunk.
  MiddlewareRegistry.register(Thunk)

  enhancers.push(applyMiddleware(...MiddlewareRegistry._elements))

  const store = createStore(rootReducer, compose(...enhancers))

  return store
}
