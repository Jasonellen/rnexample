// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: Metrics.screenWidth * 0.1,
    paddingVertical: 20
  },
  title: {
    color: '#666',
    lineHeight: 16,
    marginBottom: 30
  },
  phoneIpt: {
    borderWidth: 0.5,
    height: 40,
    borderRadius: 5,
    borderColor: '#666',
    marginVertical: 10,
    paddingLeft: 10
  },
  verifyBox: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20
  },
  verifyIpt: {
    flex: 2,
    borderWidth: 0.5,
    height: 40,
    borderRadius: 5,
    borderColor: '#666',
    paddingLeft: 10
  },
  sendMessage: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    marginLeft: 20,
    lineHeight: 36,
    textAlign: 'center',
    backgroundColor: Colors.primary,
    overflow: 'hidden',
    color: '#fff'
  },
  bindNew: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    lineHeight: 36,
    textAlign: 'center',
    backgroundColor: '#999',
    overflow: 'hidden',
    color: '#fff',
    marginTop: 130
  },
  bindNewActive: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    lineHeight: 36,
    textAlign: 'center',
    backgroundColor: Colors.primary,
    overflow: 'hidden',
    color: '#fff',
    marginTop: 130
  },
  hadAccount: {
    textAlign: 'center',
    marginVertical: 15,
    color: Colors.primary
  }
})
