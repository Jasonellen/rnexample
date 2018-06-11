// @flow

import React from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
// import StartupActions from '../Redux/StartupRedux'
// import ReduxPersist from '../Config/ReduxPersist'

import { registerApp } from 'react-native-wechat'
import request from '../Services/request'
import JsConfig from '../Config/JsConfig'

// Styles
import styles from './Styles/RootStyle'

global.request = request

class Root extends React.Component {

  constructor (props) {
    super(props)
    registerApp(JsConfig.WECHAT_APP_ID).then((data) => {
      // do nothing
    }, function (error) {
      if (__DEV__) console.log(error, 'registerApp')
    })
  }

  // componentDidMount () {
  //   // if redux persist is not active fire startup action
  //   if (!ReduxPersist.active) {
  //     this.props.startup()
  //   }
  // }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  // startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
