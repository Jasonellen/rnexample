// @flow

import React from 'react'
import { View, WebView } from 'react-native'

// Styles
import styles from './Styles/WebViewPageStyle'

export default class WebViewPage extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.props.url }} />
      </View>
    )
  }
}
