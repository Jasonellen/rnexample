// @flow

import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Provider } from 'react-redux'

import crashlytics from '../Services/CrashlyticsService'

// import '../I18n/I18n' // keep before root container
import RootContainer from './Root'
import createStore, { createMeetingStore } from '../Redux'
import applyConfigSettings from '../Config'

// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()

// 视频会议store
const meetingStore = createMeetingStore()
if (typeof global.meetingStore === 'undefined') {
  global.meetingStore = meetingStore
}

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor (props) {
    super(props)

    /**
     * 第三方依赖
     * iOS使用fabric crashlytics进行异常上报
     * Android使用bugly进行异常上报
     */
    if (Platform.OS === 'ios') {
      crashlytics.init()
    }
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
