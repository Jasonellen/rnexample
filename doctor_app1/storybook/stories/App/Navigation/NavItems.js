// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'

import CustomIcon from '../Components/IcoMoon'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

export default {
  backButton (callback: Function) {
    return (
      <TouchableOpacity onPress={callback}>
        <Icon name='md-arrow-back'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.backButton}
        />
      </TouchableOpacity>
    )
  },

  businessCardButton (callback: Function) {
    return (
      <TouchableOpacity onPress={callback}>
        <CustomIcon name='business-card'
          size={Metrics.icons.small}
          color={Colors.primary}
          style={styles.businessCardButton}
        />
      </TouchableOpacity>
    )
  }

}
