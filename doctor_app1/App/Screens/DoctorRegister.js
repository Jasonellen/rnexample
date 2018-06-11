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
import { connect } from 'react-redux'
//action
import DoctorRegisterActions from '../Redux/DoctorRegisterRedux'

// Styles
import styles from './Styles/DoctorRegisterStyle'

class DoctorRegister extends React.Component {

  componentDidMount () {
    const { type,mobile,password } = this.props.getInitialState
    this.props.setInitialState({ type,mobile,password })
  }

  render () {
    const {
      areaModal,
      hospitalModal,
      departmentModal,
      jobModal,
      areaName,
      hospitalName,
      departmentName,
      jobName,
    } = this.props.state
    const { 
      setData,
      updateSubmitData,
      submit
    } = this.props
    console.tron.display({
      name:12345678,
      value:this.props.state
    })
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
                  onChangeText={(value) => { updateSubmitData('name',value)}}
                />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;地区</Text>
                <Text
                  style={ areaName.indexOf('输入')>0 ? styles.textRightDefault : styles.textRight}
                  onPress={() => { setData('areaModal',true) }}>{ areaName }
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;医院</Text>
                <Text
                  style={ hospitalName.indexOf('输入')>0 ? styles.textRightDefault : styles.textRight}
                  onPress={() => { setData('hospitalModal',true) }}
                  >{ hospitalName }
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;科室</Text>
                <Text
                  style={ departmentName.indexOf('输入')>0 ? styles.textRightDefault : styles.textRight}
                  onPress={() => { setData('departmentModal',true) }}
                >{ departmentName }
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemLeft}>&nbsp;&nbsp;职称</Text>
                <Text
                  style={ jobName.indexOf('输入')>0 ? styles.textRightDefault : styles.textRight}
                  onPress={() => { setData('jobModal',true) }}
                >{jobName}
                </Text>
                <Image source={Images.arrowRight} style={styles.arrowRight} />
              </View>
              <View style={styles.submitContainer}>
                <Text style={styles.submit} onPress={()=>{ submit()}}>立即体验</Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Image>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={areaModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectArea/>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={hospitalModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectHospital/>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={departmentModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectDepartment/>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={jobModal}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <SelectJob/>
        </Modal>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    getInitialState:state.register,
    state: state.doctorRegister
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  setInitialState: (getInitialState) => dispatch(DoctorRegisterActions.setInitialState(getInitialState)),
  setData: (key,value) => dispatch(DoctorRegisterActions.setData(key,value)),
  updateSubmitData: (key,value) => dispatch(DoctorRegisterActions.updateSubmitData(key,value)),
  areaData: () => dispatch(DoctorRegisterActions.areaData()),
  submit: () => dispatch(DoctorRegisterActions.submit())
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRegister)
