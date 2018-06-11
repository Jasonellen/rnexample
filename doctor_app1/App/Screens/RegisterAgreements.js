// @flow

import React from 'react'
import { View, Platform, StatusBar } from 'react-native'

// Styles
import styles from './Styles/RegisterAgreementsStyle'

import WebViewPage from '../Components/WebViewPage'

import UrlConfig from '../Config/UrlConfig'

export default class RegisterAgreements extends React.Component {
  renderStatusBar () {
    if (Platform.OS === 'ios') {
      return (
        <StatusBar
          barStyle='light-content' />
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {this.renderStatusBar()}
        <WebViewPage url={UrlConfig.registerAgreements} />
      </View>
    )
  }
}
