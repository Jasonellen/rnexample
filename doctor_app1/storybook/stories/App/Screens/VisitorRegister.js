// @flow

import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Alert
} from 'react-native'

import { Images } from '../Themes'
import request from '../Services/request'
// Styles
import styles from './Styles/VisitorRegisterStyle'

class VisitorRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitData: {
        name: '',
      }
    }
  }
  componentDidMount () {
    this.setState({
      submitData: Object.assign({}, this.state.submitData, this.props.message)
    })
  }
  setName (name) {
    this.setState({
      submitData: Object.assign({}, this.state.submitData, {name})
    })
  }
  submit () {
    let parmas = {}
    parmas.user = this.state.submitData
    if (parmas.user.checknum &&
        parmas.user.name &&
        parmas.user.password &&
        parmas.user.user_mobile) {
      request.post('https://doctor.mdslife.com/api/v1/users/sign_up', parmas)
        .then((data) => {
          if (data.user.message === 'ok') {
            Alert.alert('注册成功,跳转webview')
          } else {
            Alert.alert('注册失败')
          }
        })
    } else {
      Alert.alert('请填写完整信息')
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBg} style={styles.imageBox}>
          <View style={styles.mainContainer}>
            <KeyboardAvoidingView behavior='position'>
              <Text style={styles.explain}>为了给您提供更好的服务,请填写正确的信息</Text>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;姓名</Text>
                <TextInput
                  placeholder='请输入您的真实姓名'
                  placeholderTextColor='#666'
                  underlineColorAndroid='transparent'
                  style={styles.itemRight}
                  onChangeText={(name) => { this.setName(name) }}
                />
              </View>
              <View style={styles.submitContainer}>
                <Text style={styles.submit} onPress={this.submit}>立即体验</Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Image>
      </View>
    )
  }
}

export default VisitorRegister
