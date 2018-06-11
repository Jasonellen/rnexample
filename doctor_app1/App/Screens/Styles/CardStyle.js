// @flow

import { StyleSheet } from 'react-native'
import {ApplicationStyles, Colors, Metrics} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: 15
  },
  secondTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20
  },
  box: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenWidth * 1,
    backgroundColor: '#f2f2f2'

  },
  top: {
    width: Metrics.screenWidth * 0.6,
    height: Metrics.screenWidth * 0.6,
    marginTop: Metrics.screenWidth * 0.1,
    marginLeft: Metrics.screenWidth * 0.1
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 25
  },
  left: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  paddingBottom: {
    paddingBottom: 3
  },
  normal: {
    fontSize: 12,
    color: '#333',
    paddingVertical: 3
  },
  Qcode: {
    textAlign: 'center',
    paddingVertical: 20
  },
  identifier: {
    flex: 1,
    alignItems: 'center'
  },
  idText: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    color: '#fff',
    borderRadius: 5,
    overflow: 'hidden'
  }
})
