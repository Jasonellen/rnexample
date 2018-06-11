// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  Image,
  Platform,
  StatusBar
} from 'react-native'

import { Images } from '../Themes'

// Styles
import styles from './Styles/QualificationStyle'

class Qualification extends React.Component {
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
      <ScrollView style={styles.container}>
        {this.renderStatusBar()}
        <KeyboardAvoidingView behavior='position' style={{alignItems: 'center'}}>
          <Text style={styles.title}>认证后，可开通问诊等服务</Text>
          <Text style={styles.secTitle}>请务必填写真实信息，你的信息我们将严格保密！</Text>
          <View style={styles.idBox}>
            <Text style={styles.idName}>身份证号</Text>
            <View style={styles.idNumberBox}>
              <TextInput
                style={styles.idNumber}
                placeholder='请输入18位身份证件号码'
                textDecorationLine='none'
              />
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.uploadBox}>
            <Text style={styles.uploadTitle}>请输入医生职业证书反面或手持工牌照</Text>
            <View style={styles.uploadAdd}>
              <Image source={Images.arrowRight} style={styles.uploadAddImg} />
            </View>
            <Text style={styles.explain}>请确保图片内容清晰可见</Text>
          </View>
          <View style={styles.line2} />
          <View>
            <Text style={styles.exampleTitle}>示例</Text>
            <View style={styles.exampleImgBox}>
              <View style={styles.exampleLeft}>
                <Image source={Images.loginBg} style={styles.exampleImg} />
                <Text style={styles.exampleInfo}>手持工牌照</Text>
              </View>
              <Text style={styles.and}>和</Text>
              <View style={styles.exampleRight}>
                <Image source={Images.loginBg} style={styles.exampleImg} />
                <Text style={styles.exampleInfo}>医生职业证书</Text>
              </View>
            </View>
            <Text style={styles.submit}>提交审核</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default Qualification
