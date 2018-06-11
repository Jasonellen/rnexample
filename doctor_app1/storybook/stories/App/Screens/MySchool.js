// @flow

import React from 'react'
import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'

import Button from 'apsl-react-native-button'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images } from '../Themes'
// external libs

import IcoMoonIcon from '../Components/IcoMoon'

// Styles
import styles from './Styles/MySchoolStyle'

import CustomSwiper from '../Components/CustomSwiper'

import ScrollableTabView, {DefaultTabBar} from '../Components/CustomScrollableTabView'

class MySchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      translateY: new Animated.Value(0),
      rotate: new Animated.Value(0),
      showAddContainer: 0
    }
  }

  _onAdd () {
    this.setState({
      showAddContainer: 1
    })

    Animated.timing(
       this.state.rotate,
      {
        toValue: 100,
        duration: 500
      }).start()

    Animated.timing(
       this.state.translateY,
      {
        toValue: 100,
        duration: 500
      }).start()
  }

  _offAdd () {
    Animated.timing(
       this.state.rotate,
      {
        toValue: 0,
        duration: 500
      }).start(() => {
        this.setState({
          showAddContainer: 0
        })
      })

    Animated.timing(
       this.state.translateY,
      {
        toValue: 0,
        duration: 500
      }).start()
  }

  render () {
    var interpolatedRotateAnimation = this.state.rotate.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '45deg']
    })

    var interpolatedTranslateAnimation = this.state.translateY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -300]
    })

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarPosition='top' // 默认top 还有bottom overlayTop  overlayBottom
          tabBarUnderlineStyle={{backgroundColor: '#33a9fc'}}// 返回一个对象，里面可以写通常的style样式
          tabBarBackgroundColor='white' // 默认白色
          tabBarInactiveTextColor='black'// 非活动的文字颜色
          tabBarActiveTextColor='#33a9fc' // 活动的文字颜色
          tabBarTextStyle={{fontSize: 16, paddingTop: 10}} // 字体样式
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
        >
          <View tabLabel='讲堂' >
            <ScrollView>
              <CustomSwiper />

              <View style={styles.streamRow}>
                <TouchableOpacity style={styles.streamItemWrapper} onPress={this.props.onStreams}>
                  <View style={styles.steamItem}>
                    <IcoMoonIcon size={40} name='zhibodating' style={styles.streamIcon} />
                    <Text style={styles.streamText}>直播大厅</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.streamItemWrapper} onPress={this.props.onStreamsReview}>
                  <View style={styles.steamItem}>
                    <IcoMoonIcon size={40} name='wangqihuigu' style={styles.streamIcon} />
                    <Text style={styles.streamText}>全部录像</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.videoLabelContainer}>
                <Text style={styles.videoLabel}>直播推荐</Text>
              </View>


                <TouchableOpacity>
                  <View style={styles.list}>
                    <Image source={Images.tileBg} style={styles.listImg}>
                      <Text style={styles.listImgText}>直播中</Text>
                    </Image>
                    <View style={{flex: 2}}>
                      <Text>1234567</Text>
                      <Text style={styles.hospital}>浦东新区塘桥地段医院 全科医疗科</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.price}>免费</Text>
                        <Button
                          style={styles.priceButton}
                          textStyle={styles.priceButtonText}
                          onPress={this.props.onChooseStream}>
                          2人已报名
                        </Button>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

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
            </ScrollView>

            <TouchableWithoutFeedback onPress={() => this._onAdd()}>
              <Animated.View style={[styles.box, {transform: [{rotate: interpolatedRotateAnimation}]}]}
              >
                <IcoMoonIcon name='add'
                  size={40}
                  color={Colors.snow}
                  style={styles.addButton}
                />
              </Animated.View>
            </TouchableWithoutFeedback>

            {this.state.showAddContainer
              ? <View style={styles.scaleContainer}>
                <Animated.View style={[styles.addBoxAnimatedContainer, {transform: [{translateY: interpolatedTranslateAnimation}]}]}
              >
                  <View style={styles.addBoxContainer} >
                    <View style={styles.boxContainer}>
                      <IcoMoonIcon size={36} name='zhibo' style={[styles.boxIcon, {color: '#E67E22'}]} />
                      <Text style={styles.boxText}>发起直播</Text>
                    </View>
                    <View style={styles.boxContainer}>
                      <IcoMoonIcon size={36} name='binglitaolun' style={[styles.boxIcon, {color: '#2ECC71'}]} />
                      <Text style={styles.boxText}>病例讨论</Text>
                    </View>
                    <View style={styles.boxContainer}>
                      <IcoMoonIcon size={36} name='bangzhu' style={[styles.boxIcon, {color: '#43A0DE'}]} />
                      <Text style={styles.boxText}>直播帮助</Text>
                    </View>
                  </View>
                </Animated.View>
                <TouchableWithoutFeedback onPress={() => this._offAdd()}>
                  <Animated.View style={[styles.expandedBox, {transform: [{rotate: interpolatedRotateAnimation}]}]}
                >
                    <IcoMoonIcon name='add'
                      size={40}
                      color={Colors.snow}
                      style={styles.addButton}
                  />
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            : <View />}
          </View>
          <View tabLabel='课程'>
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
          <View tabLabel='文库'>
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

export default MySchool
