/**
 * Created by DB on 16/6/15.
 * 选项卡
 */
'use strict';
import React, {Component} from 'react';
import {
    Image,
    BackAndroid,
    Platform,
    ToastAndroid
} from 'react-native';

import SplashScreen from 'react-native-smart-splash-screen'

import TabNavigator from 'react-native-tab-navigator'

import {Images, Colors} from '../themes'

import Counter from '../page/Counter'
import Meeting from '../page/Meeting'

export default class TabBarView extends Component {

    constructor(props) {
        super(props);

        this.tabBarItems = [
            {
                title: 'Message',
                icon: Images.navUnSelect1,
                selectedIcon: Images.navSelect1,
                component: Counter,

            },
            {
                title: 'Contacts',
                icon: Images.navUnSelect2,
                selectedIcon: Images.navSelect2,
                component: Meeting
            },
            {
                title: 'Activity',
                icon: Images.navUnSelect3,
                selectedIcon: Images.navSelect3,
                component: Counter
            },
            {
                title: 'Discover',
                icon: Images.navUnSelect4,
                selectedIcon: Images.navSelect4,
                component: Counter
            },
            {
                title: 'Me',
                icon: Images.navUnSelect5,
                selectedIcon: Images.navSelect5,
                component: Counter
            }
        ];

        this.state = {
            selectedTab: this.tabBarItems[0].title,
            loader: 0,
            tabBarHeight: 0
        };
    }

    componentDidMount() {

        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        });


        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }

    }

    componentWillUnmount() {

        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    //处理安卓物理返回键
    onBackAndroid = () => {

        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();

        if (routers.length > 1) {
            navigator.pop();
            return true;
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            } else {
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', 500);
                return true;
            }
        }
    };

    render() {

        switch (2) {
            case 2:
                return (
                    <TabNavigator>
                        {
                            this.tabBarItems.map((item, i) => {

                                let Component = item.component;

                                return (
                                    <TabNavigator.Item
                                        key={i}
                                        title={item.title}
                                        selected={this.state.selectedTab === item.title}
                                        selectedTitleStyle={{color: Colors.blue}}
                                        renderIcon={() => <Image style={{width: 26, height: 26}}
                                                                 source={item.icon}/>}
                                        renderSelectedIcon={() => <Image style={{width: 26, height: 26}}
                                                                         source={item.selectedIcon}/>}
                                        onPress={() => {

                                            this.setState({
                                                selectedTab: item.title
                                            })
                                        }}
                                    >
                                        <Component navigator={this.props.navigator} {...this.props}/>
                                    </TabNavigator.Item>
                                )
                            })
                        }
                    </TabNavigator>
                );
            case 0:
                return (
                    <LoginView
                        showBack={false}
                        successBlock={this.successBlock}
                        navigator={this.props.navigator}
                    />
                );
            default:
                return null
        }

    }
}
