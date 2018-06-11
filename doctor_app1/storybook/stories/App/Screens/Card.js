// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/CardStyle'

class Card extends React.Component {
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
  render () {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        {this.renderStatusBar()}
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.title}>实名认证后，你将获得专属的二维码名片</Text>
          <Text style={styles.secondTitle}>一键分享给微信好友，发朋友圈和微博</Text>
          <View style={styles.box}>
            <Image source={Images.background} style={styles.top} />
            <View style={styles.bottom}>
              <Image source={Images.missing_face} style={styles.left} />
              <View style={styles.right}>
                <Text style={styles.paddingBottom}>
                  <Text style={styles.bold}>杨陈测试</Text>
                  <Text style={styles.normal}>   (住院医师)</Text>
                </Text>
                <Text style={styles.normal}>徐汇区新乐地段医院</Text>
                <Text style={styles.normal}>围产期保健专业</Text>
              </View>
            </View>
          </View>
          <Text style={styles.Qcode}>二维码名片展示</Text>
          <TouchableOpacity style={styles.identifier} onPress={this.props.toQualification}>
            <Text style={styles.idText}>去实名认证</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default Card
