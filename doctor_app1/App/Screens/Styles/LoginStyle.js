// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    // http://stackoverflow.com/questions/29322973/whats-the-best-way-to-add-a-full-screen-background-image-in-react-native
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  container: {
    width: Metrics.screenWidth * 0.8,
    backgroundColor: Colors.snow
  },
  top: {
    alignItems: 'center',
    marginTop: 20
  },
  avatar: {
    height: 100,
    width: 100
  },
  form: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    marginVertical: Metrics.baseMargin
  },
  formItem: {
    height: 40,
    borderRadius: 5
  },
  formInput: {
    borderWidth: 1,
    borderColor: Colors.underlay,
    padding: 10,
    marginBottom: 20
  },
  formSubmit: {
    borderColor: Colors.buttonBorder,
    backgroundColor: Colors.primary
  },
  formSubmitText: {
    color: Colors.snow
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.smallMargin
  },
  footerTitle: {
    color: Colors.primary
  },
  otherLogin: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineBox: {
    marginVertical: 20,
  },
  lines: {
    width: Metrics.screenWidth * 0.6,
    borderTopWidth: 0.5,
    borderColor: '#ddd'
  },
  lineText: {
    color: '#ddd',
    position: 'absolute',
    top: -5,
    left: Metrics.screenWidth * 0.18
  },
  wechat: {
    width: 50,
    height: 30
  },
  error:{
    color:'brown',
    textAlign:'right',
    marginBottom:5,
    marginTop:-15
  }
})
