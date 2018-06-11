// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

export default {
  backButton (callback: Function) {
    return (
      <Icon.Button
        name="md-arrow-back"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={callback}
      />
    )
  },

  shareButton (callback: Function) {
    return (
      <Icon.Button
        name="md-share"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={callback}
      />
    )
  }

}
