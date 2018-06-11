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
import StudentRegisterActions from '../Redux/StudentRegisterRedux'
// Styles
import styles from './Styles/SelectEducationStyle'

class SelectEducation extends React.Component {
  click (item,index) {
    this.props.updateSchoolSubmitData('title',item)
    this.props.studentSetData('educationShowIndex',index)
    this.props.studentSetData('educationName',item)
    this.props.studentSetData('educationModal',false)
  }

  _confirm (item) {
    this.props.updateSchoolSubmitData('title',item)
    this.props.studentSetData('educationName',item)
    this.props.studentSetData('educationModal',false)
  }
  render () {
    const {
      iptShow,
      iptValue,
      educationShowIndex
    } = this.props.state
    const {
      studentSetData
    } = this.props
    let arr = ['博士', '硕士', '本科', '专科']
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {
          arr.map((item, index) => {
            return (
              <View style={styles.item} key={index}>
                <Text
                  style={educationShowIndex === index ? styles.itemTextActive : styles.itemText}
                  onPress={this.click.bind(this, item, index)}
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
                  onChangeText={(text) => {studentSetData('iptValue',text)}}
                  autoFocus
                />
                <Text style={styles.inputRight} onPress={()=>this._confirm(iptValue)}>确定</Text>
              </View>
              : <Text
                style={styles.itemText}
                onPress={()=>studentSetData('iptShow',true)}
              >其他</Text>
          }
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    state: state.studentRegister
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  studentSetData: (key,value) => dispatch(StudentRegisterActions.studentSetData(key,value)),
  updateSchoolSubmitData: (key,value)=> dispatch(StudentRegisterActions.updateSchoolSubmitData(key,value))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectEducation)
