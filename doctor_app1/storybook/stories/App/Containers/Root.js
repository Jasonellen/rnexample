// @flow

import React from 'react'
import { View, StatusBar } from 'react-native'

import NavigationRouter from '../Navigation/NavigationRouter'

// Styles
import styles from './Styles/RootStyle'

class Root extends React.Component {

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='light-content' />
        <NavigationRouter {...this.props} />
      </View>
    )
  }
}

export default Root
