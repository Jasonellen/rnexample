// @flow

import React from 'react'
import { View, StatusBar, Image, Platform } from 'react-native'

import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/NewUserStyle'

class NewUser extends React.Component {
  renderStatusBar () {
    if (Platform.OS === 'ios') {
      return (
        <StatusBar
          barStyle='dark-content' />
      )
    } else {
      return null
    }
  }
  onRegister (data) {
    Actions.register({dataType: data})
  }
  render () {
    return (
      <Image source={Images.loginBg} style={styles.backgroundImage}>
        {this.renderStatusBar()}
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Button
              style={styles.studentButtonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.onRegister('Student')}
            >
              我是学生
            </Button>
            <Button
              style={styles.doctorButtonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.onRegister('Doctor')}
            >
              我是医生
            </Button>
            <Button
              style={styles.visitorButtonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.onRegister('Visitor')}
            >
              我是访客
            </Button>
          </View>
        </View>
      </Image>
    )
  }

}

export default NewUser
