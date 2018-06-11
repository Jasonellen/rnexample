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
import {connect} from 'react-redux'
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
    const {type, mobile, password} = this.props.getInitialState
    this.setState({
      submitData: Object.assign({}, this.state.submitData, {type, mobile, password})
    })
  }
  setName (name) {
    this.setState({
      submitData: Object.assign({}, this.state.submitData, {name})
    })
  }
  submit () {
    console.tron.log(this.state)
    let onOff = true
    let params ={}
    const user = this.state.submitData
    for( let item in user){
      if( !user[item] || String(user[item]).indexOf('输入')>0){
        Alert.alert('请输入完整信息')
        onOff = false
        break;
      }
    }
    if(onOff){
      params.user = user
      request.post('https://doctor.mdslife.com/api/v1/users/sign_up', params)
      .then((data) => {
        if (data.user.message === 'ok') {
          Alert.alert('注册成功,跳转webview')
        } else {
          Alert.alert('注册失败,请稍后再试')
        }
      })
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
                <Text style={styles.submit} onPress={this.submit.bind(this)}>立即体验</Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Image>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
    return {getInitialState: state.register}
}

export default connect(mapStateToProps, null)(VisitorRegister)
