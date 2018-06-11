// // @flow
//
import React from 'react'
import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Images } from '../Themes'
// Styles
import styles from './Styles/LiveListStyle'

class LiveList extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
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
      <View style={styles.container}>
        {this.renderStatusBar()}
        <ScrollableTabView
          tabBarPosition='top' // 默认top 还有bottom overlayTop  overlayBottom
          tabBarUnderlineStyle={{backgroundColor: '#33a9fc'}}// 返回一个对象，里面可以写通常的style样式
          tabBarBackgroundColor='white' // 默认白色
          tabBarInactiveTextColor='black'// 非活动的文字颜色
          tabBarActiveTextColor='#33a9fc' // 活动的文字颜色
          tabBarTextStyle={{fontSize: 16, paddingTop: 10}} // 字体样式
          initialPage={0}
        >
          <View tabLabel='已发起' >
            <TouchableOpacity>
              <View style={styles.list}>
                <Image source={Images.tileBg} style={styles.listImg}>
                  <Text style={styles.listImgText}>直播中</Text>
                </Image>
                <View style={{flex: 2}}>
                  <Text>1234567</Text>
                  <Text style={styles.hospital}>浦东新区塘桥地段医院 全科医疗科</Text>
                  <Text style={styles.price}>免费</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View tabLabel='已预约'>
            <TouchableOpacity>
              <View style={styles.list}>
                <Image source={Images.tileBg} style={styles.listImg}>
                  <Text style={styles.listImgText}>已结束</Text>
                </Image>
                <View style={{flex: 2}}>
                  <Text>日常测试</Text>
                  <Text style={styles.hospital}>浦东新区塘桥地段医院 全科医疗科</Text>
                  <Text style={styles.price}>免费</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View tabLabel='已购买'>
            <TouchableOpacity>
              <View style={styles.list}>
                <Image source={Images.tileBg} style={styles.listImg}>
                  <Text style={styles.listImgText}>直播中</Text>
                </Image>
                <View style={{flex: 2}}>
                  <Text>1234567</Text>
                  <Text style={styles.hospital}>浦东新区塘桥地段医院 全科医疗科</Text>
                  <Text style={styles.price}>$198</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

export default LiveList
