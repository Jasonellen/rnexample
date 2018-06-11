// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavItems from './NavItems'
import TabIcon from './../Components/TabIcon'

// screens identified by the router
import SplashScreen from '../Screens/Splash'
import IndexWebviewScreen from '../Screens/IndexWebview'
import MeetingScreen from '../Screens/Meeting'
import SwitchToMeetingScreen from '../Screens/SwitchToMeeting'

import LoginScreen from './../Screens/Login'
import NewUserScreen from './../Screens/NewUser'
import RegisterScreen from '../Screens/Register'
import RegisterAgreementsScreen from './../Screens/RegisterAgreements'
import ForgetPasswordScreen from './../Screens/ForgetPassword'
import HomeScreen from './../Screens/Home'
import UsersScreen from './../Screens/Users'
import LiveListScreen from '../Screens/LiveList'
import DoctorRegisterScreen from '../Screens/DoctorRegister'
import StudentRegisterScreen from '../Screens/StudentRegister'
import VisitorRegisterScreen from '../Screens/VisitorRegister'
import MySchoolScreen from '../Screens/MySchool'
import CardScreen from '../Screens/Card'
import QualificationScreen from '../Screens/Qualification'
import BindNewAccountScreen from '../Screens/BindNewAccount'
import BindAccountScreen from '../Screens/BindAccount'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
          <Scene key='splash' component={SplashScreen} hideNavBar initial />
          <Scene key='indexWebview' component={IndexWebviewScreen}   />
          <Scene key='meetingScreen' component={MeetingScreen} hideNavBar />
          <Scene key='switchToMeetingScreen' component={SwitchToMeetingScreen} hideNavBar />
          <Scene key='login' component={LoginScreen} hideNavBar />
          <Scene key='newUser' component={NewUserScreen} hideNavBar />
          <Scene key='register' component={RegisterScreen} hideNavBar />
          <Scene key='studentRegister' component={StudentRegisterScreen} hideNavBar />
          <Scene key='doctorRegister' component={DoctorRegisterScreen} hideNavBar />
          <Scene key='visitorRegister' component={VisitorRegisterScreen} hideNavBar />
          <Scene key='registerAgreements' component={RegisterAgreementsScreen} title='麦迪森注册协议' hideNavBar={false} />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
