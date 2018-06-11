/**
 * Created by DB on 16/6/13.
 * 封装的加载中视图
 */
import React, {Component} from 'react';
import { View, Platform} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-spinkit'

export default class Loader {

    static show = (backgroundColor, size, color, type) => {
        size = size || 40;
        color = color || '#9F3EDD';
        type = type || 'Pulse';
        backgroundColor = backgroundColor || 'rgba(230,230,230,0.1)';
        this.sibling = new RootSiblings(
            <View style={{
                top: Platform.OS === 'android' ? 0 : 0, right: 0, bottom: 0, left: 0, backgroundColor: backgroundColor, justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Spinner isVisible={true} size={size} type={type} color={color}/>
            </View>
        );
    };

    static hide = () => {
        if (this.sibling) {
            this.sibling.destroy();
        }
    };
}


// CircleFlip
// Bounce
// Wave
// WanderingCubes
// Pulse
// ChasingDots
// ThreeBounce
// Circle
// 9CubeGrid
// WordPress (IOS only)
// FadingCircle
// FadingCircleAlt
// Arc (IOS only)
// ArcAlt (IOS only)