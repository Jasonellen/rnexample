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
    width: Metrics.screenWidth * 0.8,
    backgroundColor: Colors.snow
  },
  backgroundImage: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  top: {
    alignItems: 'center',
    marginTop: 20
  },
  avatar: {
    height: 100,
    width: 100
  },
  formContainer: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  formItem: {
    height: 40,
    borderRadius: 5
  },
  formSubmit: {
    borderColor: Colors.buttonBorder,
    backgroundColor: Colors.primary,
    marginTop: 10
  },
  formSubmitText: {
    color: Colors.snow
  },
  checknumTextboxView: {
    flexDirection: 'row'
  },
  checknumTextbox: {
    flex: 1.5
  },
  checknumButton: {
    flex: 1,
    height: 36,
    borderRadius: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    marginLeft: Metrics.baseMargin
  },
  checknumButtonText: {
    color: Colors.snow,
    fontSize: Fonts.size.medium
  },
  footer: {
    alignItems: 'center',
    marginTop: Metrics.doubleBaseMargin
  },
  footerText: {
    textAlign: 'center',
    padding: Metrics.baseMargin,
    fontSize: Fonts.size.small
  }
})
