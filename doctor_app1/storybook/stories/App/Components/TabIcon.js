// @flow

import React, {
  PropTypes
} from 'react'
import {
  Text,
  View
} from 'react-native'

import styles from './Styles/TabIconStyle'

import Icon from './IcoMoon'

import { Colors } from '../Themes/'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  iconName: PropTypes.string
}

const TabIcon = (props) => (
  <View style={styles.container}>
    <Icon
      color={props.selected ? '#3e9ce9' : '#999999'}
      name={props.iconName}
      size={25}
    />
    <Text style={[styles.title, { color: props.selected ? Colors.primary : 'black' }]}>
      {props.title}
    </Text>
  </View>
)

TabIcon.propTypes = propTypes

export default TabIcon
