// @flow

import React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  TextInput
} from 'react-native'

import { connect } from 'react-redux'
//action
import DoctorRegisterActions from '../Redux/DoctorRegisterRedux'
// Styles
import styles from './Styles/SelectJobStyle'

class SelectJob extends React.Component {

  click (item,index) {
    this.props.updateSubmitData('title',item)
    this.props.setData('jobShowIndex',index)
    this.props.setData('jobName',item)
    this.props.setData('jobModal',false)
  }

  _confirm (item) {
    this.props.updateSubmitData('title',item)
    this.props.setData('jobName',item)
    this.props.setData('jobModal',false)
  }
  render () {
    const { 
      iptShow,
      iptValue,
      jobShowIndex
    } = this.props.state
    const {
      setData
    } = this.props
    let arr = ['主任医师', '副主任医师', '主治医师', '住院医师']
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {
          arr.map((item, index) => {
            return (
              <View style={styles.item} key={index}>
                <Text
                  style={jobShowIndex === index ? styles.itemTextActive : styles.itemText}
                  onPress={()=>this.click(item,index)}
                >{item}</Text>
              </View>
            )
          })
        }
        <View style={{flex: 1}}>
          {
            iptShow
              ? <View style={styles.inputContainer}>
                <TextInput
                  placeholder='请输入职称'
                  underlineColorAndroid='transparent'
                  style={styles.inputLeft}
                  onChangeText={(text) => {setData('iptValue',text)}}
                  autoFocus
                />
                <Text style={styles.inputRight} onPress={()=>this._confirm(iptValue)}>确定</Text>
              </View>
              : <Text
                style={styles.itemText}
                onPress={()=>setData('iptShow',true)}
                >其他</Text>
          }
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    state: state.doctorRegister
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  setData: (key,value) => dispatch(DoctorRegisterActions.setData(key,value)),
  updateSubmitData: (key,value)=> dispatch(DoctorRegisterActions.updateSubmitData(key,value))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectJob)
