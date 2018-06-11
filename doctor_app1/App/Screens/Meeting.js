// @flow

import React from 'react'
import { ScrollView, Text, View, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

import  Storage  from '../Lib/Storage';

import { App as MeetingApp, appNavigate } from './../../react/features/app'

import config from './../../react/config';

// Styles
import styles from './Styles/MeetingStyle'

class Meeting extends React.Component {
  constructor(props) {
    super(props);

    this._handleBackButtonPress = this._handleBackButtonPress.bind(this)
  }

  componentWillMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress);
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButtonPress);
  }

  _handleBackButtonPress () {
    Storage.get('lastUrl').then((url)=>{
      NavigationActions.indexWebview({
        lastUrl:url,
        type: ActionConst.RESET
      });
    })

    return true
  }

  render () {
    const { store } = this.context;

    return (
      <View style={styles.container}>
        <MeetingApp
            config = { config }
            store = { global.meetingStore }
            defaultRoomId = { this.props.room }
        />
      </View>
    )
  }

}

Meeting.contextTypes = {
  store: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meeting)
