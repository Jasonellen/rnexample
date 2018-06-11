// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flexDirection: 'row',
    flex: 1
  },
  list: {
    padding: 16,
    backgroundColor: Colors.primary,
    color: '#fff'
  },
  listLeftBottom: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5
  },
  listRight: {
    padding: 16,
    backgroundColor: '#fff',
    color: Colors.primary
  }
})
