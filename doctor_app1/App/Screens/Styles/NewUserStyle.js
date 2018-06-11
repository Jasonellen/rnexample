// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: Metrics.screenWidth * 0.8
  },
  backgroundImage: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  textStyle: {
    color: Colors.snow,
    fontWeight: 'bold',
    fontSize: Fonts.size.h4
  },
  studentButtonStyle: {
    borderColor: '#5cb85c',
    backgroundColor: '#5cb85c',
    height: 50,
    borderRadius: Metrics.buttonRadius,
    marginVertical: Metrics.baseMargin
  },
  doctorButtonStyle: {
    borderColor: '#5bc0de',
    backgroundColor: '#5bc0de',
    height: 50,
    borderRadius: Metrics.buttonRadius,
    marginVertical: Metrics.baseMargin
  },
  visitorButtonStyle: {
    borderColor: '#eca33c',
    backgroundColor: '#eca33c',
    height: 50,
    borderRadius: Metrics.buttonRadius,
    marginVertical: Metrics.baseMargin
  }
})
