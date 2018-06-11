// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  image: {
    width: Metrics.screenWidth,
    flex: 1
  }
})
