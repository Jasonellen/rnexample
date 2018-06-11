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
import SelectArea from '../Components/SelectArea'
import SelectSchool from '../Components/SelectSchool'
import SelectProfession from '../Components/Selectprofession'
import SelectEducation from '../Components/SelectEducation'
import request from '../Services/request'
// Styles
import styles from './Styles/StudentRegisterStyle'

class StudentRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      areaModal: false,
      schoolModal: false,
      professionModal: false,
      educationModal: false,
      areaName: '请选择您的地区',
      schoolName: '', // 学校名称
      schoolIndex: '0', // 选择学校页显示的列表高亮项
      hospitalData: '',
      professionName: '',
      educationName: '',
      submitData: {
        name: '',
        region: '',
        school: '',
        department: '',
        title: ''
      }
    }
  }
  componentDidMount () {
    this.setState({
      submitData: Object.assign({}, this.state.submitData, this.props.message)
    })
  }
  setArea (data, proName, cityName, cityId) {
    this.setState({
      areaName: cityName.indexOf('区') === -1 ? cityName : proName,
      areaModal: false,
      submitData: Object.assign({}, this.state.submitData, {region: cityId})
    })
  }
  setSchool (name, rowId, schoolId) {
    this.setState({
      schoolName: name,
      schoolIndex: rowId,
      schoolModal: false,
      submitData: Object.assign({}, this.state.submitData, {school: schoolId})
    })
  }
  setProfession (departmentName, departmentId) {
    this.setState({
      professionModal: false,
      professionName: departmentName,
      submitData: Object.assign({}, this.state.submitData, {department: departmentId})
    })
  }
  setEducation (data) {
    this.setState({
      educationModal: false,
      educationName: data,
      submitData: Object.assign({}, this.state.submitData, {title: data})
    })
    // setTimeout(() => {
    //   console.log(this.state.submitData)
    // },3000)
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
        parmas.user.department &&
        parmas.user.school &&
        parmas.user.name &&
        parmas.user.password &&
        parmas.user.region &&
        parmas.user.title &&
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
  areaModal () {
    this.setState({
      areaModal: true
    })
  }
  schoolModal () {
    if (this.state.areaName === '请选择您的地区'){
      alert('请选择您的地区')
    } else {
      this.setState({
        schoolModal: true
      })
    }
  }
  professionModal () {
    this.setState({
      professionModal: true
    })
  }
  educationModal () {
    this.setState({
      educationModal: true
    })
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
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;地区</Text>
                <Text
                  style={this.state.areaName === '请选择您的地区' ? styles.textRightDefault : styles.textRight}
                  onPress={this.areaModal.bind(this)}>{this.state.areaName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;学校</Text>
                <Text
                  style={styles.textRight}
                  onPress={this.schoolModal.bind(this)}
                >{this.state.schoolName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;专业</Text>
                <Text
                  style={styles.textRight}
                  onPress={this.professionModal.bind(this)}
                >{this.state.professionName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;学历</Text>
                <Text
                  style={styles.textRight}
                  onPress={this.educationModal.bind(this)}
                >{this.state.educationName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.submitContainer}>
                <Text style={styles.submit} onPress={this.submit}>立即体验</Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Image>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.areaModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectArea
            setArea={this.setArea.bind(this)}
          />
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.schoolModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectSchool
            cityName={this.state.areaName === '请选择您的地区' ? '北京市' : this.state.areaName}
            schoolIndex={this.state.schoolIndex}
            setSchool={this.setSchool.bind(this)}
          />
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.professionModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectProfession
            setProfession={this.setProfession.bind(this)}
          />
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.educationModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectEducation
            setEducation={this.setEducation.bind(this)}
          />
        </Modal>
      </View>
    )
  }
}

export default StudentRegister
