// @flow

import React, { Component } from 'react'

import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'

import TabIcon from './../Components/TabIcon'

// screens identified by the router
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
      <Router {...this.props} >
        <Scene key='root' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
          <Scene key='login' initial={this.props.initialScene === 'login'} component={LoginScreen} hideNavBar />
          <Scene key='newUser' initial={this.props.initialScene === 'newUser'} component={NewUserScreen} hideNavBar />
          <Scene key='register' initial={this.props.initialScene === 'register'} component={RegisterScreen} hideNavBar />
          <Scene key='registerAgreements' initial={this.props.initialScene === 'registerAgreements'} component={RegisterAgreementsScreen} title='麦迪森注册协议' />
          <Scene key='forgetPassword' initial={this.props.initialScene === 'forgetPassword'} component={ForgetPasswordScreen} hideNavBar />
          <Scene key='tabbar' initial={this.props.showTabbar} >
            <Scene
              initial={this.props.showTabbar}
              key='main'
              tabs
              tabBarStyle={Styles.tabBarStyle}
              tabBarSelectedItemStyle={Styles.tabBarSelectedItemStyle}
            >
              <Scene key='homeTab' initial={this.props.showHomeTab} title='首页' icon={TabIcon} iconName='home' navigationBarStyle={Styles.homeTabNavBar} >
                <Scene key='home' initial={this.props.initialScene === 'home'} component={HomeScreen} />
                <Scene key='mySchool' initial={this.props.initialScene === 'mySchool'} component={MySchoolScreen} hideNavBar />
              </Scene>
              <Scene key='patients' initial={this.props.initialScene === 'patients'} hideNavBar component={HomeScreen} title='患者' icon={TabIcon} iconName='patients' />
              <Scene key='friends' initial={this.props.initialScene === 'friends'} hideNavBar component={HomeScreen} title='医脉' icon={TabIcon} iconName='friends' />
              <Scene key='users' initial={this.props.initialScene === 'users'} hideNavBar component={UsersScreen} title='我的' icon={TabIcon} iconName='users' />
            </Scene>
          </Scene>
          <Scene key='card' initial={this.props.initialScene === 'card'} hideNavBar component={CardScreen} />
          <Scene key='qualification' initial={this.props.initialScene === 'qualification'} hideNavBar component={QualificationScreen} />
          <Scene key='bindNewAccount' initial={this.props.initialScene === 'bindNewAccount'} hideNavBar component={BindNewAccountScreen} />
          <Scene key='bindAccount' initial={this.props.initialScene === 'bindAccount'} hideNavBar component={BindAccountScreen} />
          <Scene key='liveList' initial={this.props.initialScene === 'liveList'} hideNavBar component={LiveListScreen} />
          <Scene key='doctorRegister' initial={this.props.initialScene === 'doctorRegister'} component={DoctorRegisterScreen} hideNavBar />
          <Scene key='studentRegister' initial={this.props.initialScene === 'studentRegister'} component={StudentRegisterScreen} hideNavBar />
          <Scene key='visitorRegister' initial={this.props.initialScene === 'visitorRegister'} component={VisitorRegisterScreen} hideNavBar />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
