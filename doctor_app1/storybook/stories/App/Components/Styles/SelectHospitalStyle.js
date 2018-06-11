// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  itemText: {
    color: Colors.primary,
    lineHeight: 40,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15
  },
  itemTextActive: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: Colors.primary,
    paddingLeft: 15,
    paddingRight: 15,
    lineHeight: 40
  }
})
