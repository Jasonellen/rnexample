// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f2f2f2'
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
  secTitle: {
    textAlign: 'center'
  },
  idBox: {
    marginTop: 20,
    flexDirection: 'row'
  },
  idName: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    marginTop: 5
  },
  idNumberBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    flex: 3,
    marginRight: 30,
    borderColor: '#999',
    height: 30,
  },
  idNumber: {
    height: 50,
    fontSize: 14,
    textAlign: 'center',
    marginTop: -10
  },
  line: {
    width: Metrics.screenWidth * 0.8,
    borderTopWidth: 0.5,
    marginVertical: 15,
    borderColor: '#999'
  },
  line2: {
    width: Metrics.screenWidth * 0.8,
    borderTopWidth: 0.5,
    marginVertical: 15,
    borderColor: '#999'
  },
  uploadBox: {
    // flex: 1
    alignItems: 'center'
  },
  uploadTitle: {
    textAlign: 'center',
    marginBottom: 10
  },
  uploadAdd: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  explain: {
    color: '#333',
    marginVertical: 20
  },
  exampleTitle: {
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20
  },
  exampleImgBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exampleLeft: {
    flex: 5,
    alignItems: 'center'
  },
  exampleImg: {
    width: 120,
    height: 100,
  },
  exampleInfo: {
    marginTop: 10
  },
  and: {
    flex: 1,
    textAlign: 'center',
    marginTop: -20
  },
  exampleRight: {
    flex: 5,
    alignItems: 'center'
  },
  submit: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    color: '#fff',
    marginTop: 80
  }
})
