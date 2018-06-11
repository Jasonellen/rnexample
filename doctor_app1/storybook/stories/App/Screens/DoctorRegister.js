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
import SelectHospital from '../Components/SelectHospital'
import SelectDepartment from '../Components/SelectDepartment'
import SelectJob from '../Components/SelectJob'
import request from '../Services/request'

// Styles
import styles from './Styles/DoctorRegisterStyle'

class DoctorRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      areaModal: false,
      hospitalModal: false,
      departmentModal: false,
      jobModal: false,
      areaName: '请输入地区',
      hospitalName: '',
      hospitalData: '',
      departmentName: '',
      jobName: '',
      submitData: {
        name: '',
        region: '',
        hospital: '',
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
  setArea (data, proName, cityName, proId, cityId) {
    console.log(cityId)
    this.setState({
      areaName: cityName,
      areaModal: false,
      hospitalData: [ data, proName, cityName, proId ],
      submitData: Object.assign({}, this.state.submitData, {region: cityId})
    })
  }
  setHospital (hospitalName, hospitalId) {
    this.setState({
      hospitalName: hospitalName,
      hospitalModal: false,
      submitData: Object.assign({}, this.state.submitData, {hospital: hospitalId})
    })
  }
  setDepartment (departmentName, departmentId) {
    this.setState({
      departmentModal: false,
      departmentName: departmentName,
      submitData: Object.assign({}, this.state.submitData, {department: departmentId})
    })
  }
  setJob (name) {
    this.setState({
      jobModal: false,
      jobName: name,
      submitData: Object.assign({}, this.state.submitData, {title: name})
    })
    setTimeout(() => {
      console.log(this.state.submitData)
    },3000)
  }
  areaModal () {
    this.setState({
      areaModal: true
    })
  }
  hospitalModal () {
    if (this.state.areaName === '请输入地区') {
      global.alert('请先选择地区')
    } else {
      this.setState({
        hospitalModal: true
      })
    }
  }
  departmentModal () {
    this.setState({
      departmentModal: true
    })
  }
  jobModal () {
    this.setState({
      jobModal: true
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
        parmas.user.department &&
        parmas.user.hospital &&
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
                  placeholder='请输入姓名'
                  placeholderTextColor='#666'
                  underlineColorAndroid='transparent'
                  style={styles.itemRight}
                  onChangeText={(name) => { this.setName(name) }}
                />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;地区</Text>
                <Text
                  style={this.state.areaName === '请输入地区' ? styles.textRightDefault : styles.textRight}
                  onPress={this.areaModal.bind(this)}>{this.state.areaName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;医院</Text>
                <Text
                  style={styles.textRight}
                  onPress={this.hospitalModal.bind(this)}
                  >{this.state.hospitalName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;科室</Text>
                <Text
                  style={styles.textRight}
                  onPress={this.departmentModal.bind(this)}
                >{this.state.departmentName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;职称</Text>
                <Text
                  style={styles.textRight}
                  onPress={this.jobModal.bind(this)}
                >{this.state.jobName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.submitContainer}>
                <Text style={styles.submit} onPress={this.submit.bind(this)}>立即体验</Text>
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
          visible={this.state.hospitalModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectHospital
            data={this.state.hospitalData}
            setHospital={this.setHospital.bind(this)}
          />
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.departmentModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectDepartment
            setDepartment={this.setDepartment.bind(this)}
          />
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.jobModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectJob
            setJob={this.setJob.bind(this)}
          />
        </Modal>
      </View>
    )
  }
}

export default DoctorRegister
