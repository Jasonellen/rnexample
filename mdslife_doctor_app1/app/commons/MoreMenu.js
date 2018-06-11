/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component,PropTypes} from 'react'
import {
    TouchableOpacity,
    Text,
    Image,
    View,
    Dimensions,
    StyleSheet,
    Alert
} from 'react-native'
import Popover from "./PopoverView";

import AddFriendsView from '../page/Contacts/AddFriendsView'
import StartGroup from '../page/Contacts/StartGroup'
import QRCode from '../page/Contacts/QRCode'
import Camera from 'react-native-camera';

const {width, height} = Dimensions.get('window');

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        };

        this.MORE_MENU = [
            {title:'GroupChat', icon:require('../image/message_groupchat.png')},
            {title:'AddFriends', icon:require('../image/message_addfriend.png')},
            {title:'Scan', icon:require('../image/message_scan.png')}
        ];
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus:PropTypes.array,
    };

    open = () => {
        this.showPopover();
    };

    showPopover = () => {
        this.setState({
            isVisible: true,
            buttonRect: {x: width - 20, y: __IOS__ ? 70 : 48, width: 0, height: 0}
        });

    };

    closePopover = () => {
        this.setState({
            isVisible: false,
        });
        if (typeof(this.props.onClose) === 'function')this.props.onClose();
    };

    onMoreMenuSelect = (tab) => {
        this.closePopover();
        // if (typeof(this.props.onMoreMenuSelect) == 'function')this.props.onMoreMenuSelect(tab);

        const {navigator} = this.props;

        if (tab === 0) {

            navigator.push({
                component: StartGroup,
                params:{
                }
            })
        } else if (tab === 2) {

            if (__IOS__) {
                Camera.checkVideoAuthorizationStatus().then((v) => {
                    if (v) {
                        navigator.push({
                            component: QRCode,
                            params:{
                            }
                        })
                    } else {
                        Alert.alert('No permission','Please go to system settings and give this app authority to open camera!');
                    }
                });
            } else {
                navigator.push({
                    component: QRCode,
                    params:{
                    }
                })
            }

        } else {
            navigator.push({
                component: AddFriendsView,
                params:{
                }
            })
        }
    };

    render() {
        return (
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                onClose={this.closePopover}
                contentStyle={{backgroundColor:'#fff',right:8}}
                placement="bottom"
            >
                <View style={{flex:1}}>
                    {this.MORE_MENU.map((result, i) => {
                        return (
                            <View
                                key={i}
                            >
                            <TouchableOpacity

                                onPress={()=>this.onMoreMenuSelect(i)}
                                style={styles.button}
                            >
                                <Image
                                    style={styles.icon}
                                    source={result.icon}
                                />
                                <Text style={styles.title}>
                                    {result.title}
                                </Text>
                            </TouchableOpacity>
                                {i === this.MORE_MENU.length - 1 ? null : <View style={styles.separator}/>}
                            </View>
                        )
                    })
                    }
                </View>
            </Popover>
        );
    }

}

const styles = StyleSheet.create({
    icon:{
        width:25,
        height:25
    },
    button:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:6
    },
    title: {
        fontSize: 16,
        color:'#191919',
        padding: 8,
        fontWeight: '400',
        marginLeft:6
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        margin: 5,
        backgroundColor: '#D8D8D8',
    },
});