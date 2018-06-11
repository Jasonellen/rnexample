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
    borderBottomColor: '#ddd'
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
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd'
  },
  inputLeft: {
    flex: 5,
    height: 40,
    fontSize: 14,
    paddingLeft: 15
  },
  inputRight: {
    flex: 1,
    borderWidth: 1,
    height: 25,
    marginTop: 7,
    marginRight: 15,
    borderRadius: 5,
    borderColor: Colors.primary,
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 20
  }
})
