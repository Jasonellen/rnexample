// @flow

import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin
  },
  title: {
    fontSize: 14
  }
})
