// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles,Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  mainContainer: {
    width: Metrics.screenWidth * 0.8,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15
  },
  imageBox: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  explain: {
    color: Colors.primary,
    lineHeight: 60,
    fontSize: 12,
    textAlign: 'center'
  },
  item: {
    height: 36,
    borderBottomColor: '#666',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    marginBottom: 10
  },
  itemLeft: {
    flex: 1,
    fontSize: 14,
    paddingTop: 10
  },
  itemRight: {
    flex: 4,
    height: 36,
    marginTop: 2,
    fontSize: 14
  },
  textRight: {
    flex: 4,
    height: 34,
    lineHeight: 30,
    fontSize: 14,
    marginLeft: 5
  },
  textRightDefault: {
    flex: 4,
    height: 34,
    lineHeight: 30,
    fontSize: 14,
    color: '#666',
    marginLeft: 5
  },
  arrowRight: {
    height: 18,
    marginTop: 8,
    marginRight: 10
  },
  submitContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  submit: {
    color: 'white',
    height: 32,
    lineHeight: 26,
    textAlignVertical: 'center',
    fontSize: 16,
    backgroundColor: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    overflow: 'hidden'
  }
})
