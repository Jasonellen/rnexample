// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
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
    marginVertical: 20,
    paddingLeft: 10
  },
  verifyIpt: {
    flex: 2,
    borderWidth: 0.5,
    height: 40,
    borderRadius: 5,
    borderColor: '#666',
    paddingLeft: 10,
  },
  bindNew: {
    height: 40,
    borderRadius: 5,
    lineHeight: 36,
    textAlign: 'center',
    backgroundColor: '#999',
    overflow: 'hidden',
    color: '#fff',
    marginTop: 130,
  },
  bindNewActive: {
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
  },
  press: {
    flex: 1
  }
})
