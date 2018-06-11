// @flow

import React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  TextInput
} from 'react-native'

// Styles
import styles from './Styles/SelectEducationStyle'

class SelectEducation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showIndex: '',
      iptShow: false,
      text: ''
    }
  }
  click (item, index) {
    this.setState({
      showIndex: index
    })
    this.props.setEducation(item)
  }
  otherClick () {
    this.setState({
      iptShow: true
    })
  }
  _confirm () {
    this.props.setEducation(this.state.text)
  }
  render () {
    let arr = ['博士', '硕士', '本科', '专科']
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {
          arr.map((item, index) => {
            return (
              <View style={styles.item} key={index}>
                <Text
                  style={this.state.showIndex === index ? styles.itemTextActive : styles.itemText}
                  onPress={this.click.bind(this, item, index)}
                >{item}</Text>
              </View>
            )
          })
        }
        <View style={{flex: 1}}>
          {
            this.state.iptShow
              ? <View style={styles.inputContainer}>
                <TextInput
                  placeholder='请输入职称'
                  underlineColorAndroid='transparent'
                  style={styles.inputLeft}
                  onChangeText={(text) => { this.setState({text}) }}
                  autoFocus
                />
                <Text style={styles.inputRight} onPress={this._confirm.bind(this)}>确定</Text>
              </View>
              : <Text
                style={styles.itemText}
                onPress={this.otherClick.bind(this)}
              >其他</Text>
          }
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default SelectEducation

