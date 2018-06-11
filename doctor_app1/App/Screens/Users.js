// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux'

import { Metrics, Images } from '../Themes'
// external libs

import IcoMoonIcon from '../Components/IcoMoon'
import { Actions  } from 'react-native-router-flux'

// Styles
import styles from './Styles/UsersStyle'

class Users extends React.Component {
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
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.header}>
            <View style={styles.headLeft}>
              <Image source={Images.missing_face} style={styles.headImage} />
              <View style={styles.headContent}>
                <View style={styles.headtitle}>
                  <Text style={styles.headtitle1}>张某某</Text>
                  <Text style={styles.headtitle2}>(住院医师)</Text>
                </View>
                <Text style={styles.headId}>ID:64864533</Text>
              </View>
            </View>
            <Image source={Images.arrowRight} style={styles.headRight} />
          </View>

          <View style={styles.nav}>
            <TouchableOpacity style={styles.navList} onPress={this.props.goTo('LiveList')}>
              <IcoMoonIcon
                name='my-live'
                style={styles.navImg}
              />
              <Text>我的直播</Text>
            </TouchableOpacity>
            <View style={styles.navList}>
              <IcoMoonIcon
                name='my-article'
                style={styles.navImg}
              />
              <Text>我的文章</Text>
            </View>
            <View style={styles.navList}>
              <IcoMoonIcon
                name='my-server'
                style={styles.navImg}
              />
              <Text>我的服务</Text>
            </View>
            <View style={styles.navList}>
              <IcoMoonIcon
                name='my-class'
                style={styles.navImg}
              />
              <Text>我的课程</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.contentList}>
              <IcoMoonIcon
                name='my-income'
                style={styles.contentImg}
              />
              <Text style={styles.contentText}>我的收入</Text>
            </View>
            <View style={styles.contentList}>
              <IcoMoonIcon
                name='evaluate'
                style={styles.contentImg}
              />
              <Text style={styles.contentText}>患者评价</Text>
            </View>
            <View style={styles.contentList}>
              <IcoMoonIcon
                name='medical-security'
                style={styles.contentImg}
              />
              <Text style={styles.contentText}>行医保障</Text>
            </View>
            <View style={styles.contentList}>
              <IcoMoonIcon
                name='shimingrenzheng'
                style={styles.contentImg}
              />
              <View style={styles.textTwoBox}>
                <Text style={styles.contentText}>实名认证</Text>
                <Text style={styles.textTwo}>已验证</Text>
              </View>
            </View>
            <View style={styles.noBorder}>
              <IcoMoonIcon
                name='shimingrenzheng'
                style={styles.contentImg}
              />
              <View style={styles.textTwoBox}>
                <Text style={styles.contentText}>开通直播</Text>
                <Text style={styles.textTwo}>未开通</Text>
              </View>
            </View>
          </View>

          <View style={styles.service}>
            <View style={styles.contentList}>
              <IcoMoonIcon
                name='xiaoxitongzhi'
                style={styles.contentImg}
              />
              <Text style={styles.contentText}>消息中心</Text>
            </View>
            <View style={styles.contentList}>
              <IcoMoonIcon
                name='help-and-feedback'
                style={styles.contentImg}
              />
              <Text style={styles.contentText}>帮助与反馈</Text>
            </View>
            <View style={styles.noBorder}>
              <IcoMoonIcon
                name='set'
                style={styles.contentImg}
              />
              <Text style={styles.contentText}>设置</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default Users
