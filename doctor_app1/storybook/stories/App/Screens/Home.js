// @flow

import React from 'react'
import { ScrollView, Text, StatusBar, Platform, View, Alert, TouchableOpacity } from 'react-native'

// Styles
import styles from './Styles/HomeStyle'

import NavItems from '../Navigation/NavItems'

import { Actions } from 'react-native-router-flux'

import { Metrics, Colors } from '../Themes'

import Icon from 'react-native-vector-icons/Ionicons'

import IcoMoonIcon from '../Components/IcoMoon'

import CustomSwiper from '../Components/CustomSwiper'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.renderLeftButton = this.renderLeftButton.bind(this)
    this.renderRightButton = this.renderRightButton.bind(this)
  }

  renderLeftButton () {
    return NavItems.businessCardButton(this.props.onQrcode)
  }

  renderRightButton () {
    return (
      <Menu onSelect={value => Alert.alert(`Selected number: ${value}`)} >
        <MenuTrigger>
          <Icon name='md-add'
            size={Metrics.icons.small}
            color={Colors.primary}
            style={styles.addButton}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1} onSelect={this.props.onAddFriend}>
            <View style={styles.menuBtn}>
              <IcoMoonIcon style={styles.menuBtnIcon} name='add-friend' size={15} />
              <Text style={styles.menuBtnText}>添加朋友</Text>
            </View>
          </MenuOption>
          <MenuOption value={2} onSelect={this.props.onGroupChat}>
            <View style={styles.menuBtn}>
              <IcoMoonIcon style={styles.menuBtnIcon} name='sponsor-group-chat' size={15} />
              <Text style={styles.menuBtnText}>发起群聊</Text>
            </View>
          </MenuOption>
          <MenuOption value={3} onSelect={this.props.onPostMessage}>
            <View style={[styles.menuBtn, styles.lastMenuBtn]}>
              <IcoMoonIcon style={styles.menuBtnIcon} name='post-message' size={15} />
              <Text style={styles.menuBtnText}>发布信息</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    )
  }

  componentDidMount () {
    Actions.refresh({
      title: '住院医生',
      renderLeftButton: this.renderLeftButton,
      renderRightButton: this.renderRightButton
    })
  }

  renderBoxes () {
    return (
      <View>
        <View style={styles.boxesContainer}>
          <TouchableOpacity onPress={this.props.onWodezhensuo}>
            <View style={styles.boxContainer}>
              <View style={styles.backgroundContainer}>
                <IcoMoonIcon size={50} name='wodezhensuo' style={styles.boxIcon} />
              </View>
              <Text style={styles.boxName}>我的诊所</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onWodedaxuetang}>
            <View style={styles.boxContainer}>
              <View style={styles.backgroundContainer}>
                <IcoMoonIcon size={50} name='wodedaxuetang' style={styles.boxIcon} />
              </View>
              <Text style={styles.boxName}>我的大学堂</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onGuojiyiliaolianmeng}>
            <View style={styles.boxContainer}>
              <View style={styles.backgroundContainer}>
                <IcoMoonIcon size={50} name='guojiyiliaolianmeng' style={styles.boxIcon} />
              </View>
              <Text style={styles.boxName}>国际医疗联盟</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxesContainer}>
          <TouchableOpacity onPress={this.props.onExpertTeam}>
            <View style={styles.boxContainer}>
              <View style={styles.backgroundContainer}>
                <IcoMoonIcon size={50} name='expert-team' style={styles.boxIcon} />
              </View>
              <Text style={styles.boxName}>专家团队</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onDoctorCollaboration}>
            <View style={styles.boxContainer}>
              <View style={styles.backgroundContainer}>
                <IcoMoonIcon size={50} name='doctor-collaboration' style={styles.boxIcon} />
              </View>
              <Text style={styles.boxName}>医生协作</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onResearchTopic}>
            <View style={styles.boxContainer}>
              <View style={styles.backgroundContainer}>
                <IcoMoonIcon size={50} name='research-topic' style={styles.boxIcon} />
              </View>
              <Text style={styles.boxName}>课题研究</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

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
      <ScrollView style={styles.mainContainer}>
        {this.renderStatusBar()}
        <CustomSwiper />
        {this.renderBoxes()}
      </ScrollView>
    )
  }

}

export default Home
