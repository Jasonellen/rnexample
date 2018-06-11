/*
 * 从webview直接切换到视频会议，应用会奔溃
 * 所以增加一层Screen，作为webview到视频会议的过度
 */

import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
//
//
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Styles
import { styles } from '../../react/features/welcome/components/styles'

class SwitchToMeeting extends React.Component {
  componentDidMount () {
    setTimeout(() => NavigationActions.meetingScreen({type: ActionConst.RESET, room: this.props.room}), 500)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.localVideoOverlay}>
          <View style={styles.roomContainer}>
            <Text style={styles.title}>
              { '麦迪森会议' }
            </Text>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchToMeeting)
