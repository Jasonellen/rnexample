/**
 * Created by DB on 16/7/16.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar,
    PixelRatio
} from 'react-native';

let width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        height: PropTypes.number,
        titleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        leftButtonTitle: PropTypes.string,
        leftButtonTitleColor: PropTypes.string,
        onLeftButtonPress: PropTypes.func,
        rightButtonTitle: PropTypes.string,
        rightButtonTitleColor: PropTypes.string,
        onRightButtonPress: PropTypes.func,
        showLeftDefault: PropTypes.bool
    };

    static defaultProps = {
        title:'',
        height: 44,
        titleColor: '#FFF',
        backgroundColor: '#3e9ce9',
        leftButtonTitle: null,
        leftButtonTitleColor: '#FFF',
        rightButtonTitle: null,
        rightButtonTitleColor: '#000',
        showLeftDefault: true,
        showRightDefault: true,
        leftImageColor: '#FFF',
    };

    componentWillMount() {
        this.state = this._getStateFromProps(this.props);

    }

    componentWillReceiveProps(newProps) {
        let newState = this._getStateFromProps(newProps);
        this.setState(newState);
    }

    shouldComponentUpdate(nextProps, nextState, context) {
        return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
    }

    _getStateFromProps(props) {
        let title = props.title;
        let height = props.height;
        let titleColor = props.titleColor;
        let backgroundColor = props.backgroundColor;
        let leftButtonTitle = props.leftButtonTitle;
        let leftButtonTitleColor = props.leftButtonTitleColor;
        let onLeftButtonPress = props.onLeftButtonPress;
        let rightButtonTitle = props.rightButtonTitle;
        let rightButtonTitleColor = props.rightButtonTitleColor;
        let onRightButtonPress = props.onRightButtonPress;
        let leftButtonIcon = props.leftButtonIcon;
        let rightButtonIcon = props.rightButtonIcon;
        let showLeftDefault = props.showLeftDefault;
        let showRightDefault = props.showRightDefault;

        return {
            title,
            height,
            titleColor,
            backgroundColor,
            leftButtonTitle,
            leftButtonTitleColor,
            onLeftButtonPress,
            rightButtonTitle,
            rightButtonTitleColor,
            onRightButtonPress,
            leftButtonIcon,
            rightButtonIcon,
            showLeftDefault,
            showRightDefault
        };
    }

    _renderLeftIcon() {
        if (this.state.showLeftDefault) {
            return (
                <Icon style={{backgroundColor: 'transparent', marginTop: 0, marginLeft:8}}
                      name="ios-arrow-back-outline" size={25} color={this.props.leftImageColor}/>
            );
        }

        if (this.state.leftButtonIcon) {
            return (
                <Image style={styles.leftButtonIcon} resizeMode={'contain'} source={this.state.leftButtonIcon}/>
            );
        }
        return null;
    }

    _renderRightIcon() {

        if (this.state.showRightDefault) {
            return (
                <Icon style={{backgroundColor: 'transparent', marginRight:8}}
                      name="md-share" size={22} color={this.props.leftImageColor}/>
            );
        }

        if (this.state.rightButtonIcon) {
            return (
                <Image style={[styles.rightButtonIcon,this.props.rightStyle]} resizeMode={'contain'} source={this.state.rightButtonIcon}/>
            );
        }
        return null;
    }

    _onLeftButtonPressHandle(event) {
        let onPress = this.state.onLeftButtonPress;

        if (!onPress && this._renderLeftIcon()!=null) {

            const {navigator} = this.props;
            if (navigator) {
                const routers = navigator.getCurrentRoutes();
                if (routers.length > 1) {
                    navigator.pop();
                }
            }
        } else {
            typeof onPress === 'function' && onPress(event);
        }
    }

    _onRightButtonPressHandle(event) {
        let onPress = this.state.onRightButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    render() {
        let height = Platform.OS === 'ios' ? this.state.height + 20 : this.state.height;
        return (
            <View style={[styles.container,{
                height: height,
                backgroundColor: this.state.backgroundColor,
            },this.props.style]}>


                <TouchableOpacity onPress={this._onLeftButtonPressHandle.bind(this)}>
                    <View style={[styles.leftButton,this.props.leftButton]}>
                        {this._renderLeftIcon()}
                        <Text style={[styles.leftButtonTitle, {color: this.state.leftButtonTitleColor}]}>
                            {this.state.leftButtonTitle}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={[styles.titleText, {color: this.state.titleColor}]} numberOfLines={1}>
                        {this.state.title}
                    </Text>
                </View>

                <TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
                    <View style={[styles.rightButton,this.props.rightButton]}>
                        {this.props.children}
                        {this._renderRightIcon()}
                        <Text style={[styles.rightButtonTitle, {color: this.state.rightButtonTitleColor}]}>
                            {this.state.rightButtonTitle}
                        </Text>

                    </View>
                </TouchableOpacity>



            </View>
        );
    }
};

let styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios:{
                paddingTop: 20,
            }
        }),
        flexDirection: 'row',
        width: width,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: '#F4F4F4'
    },
    leftButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingLeft: 8
    },
    leftButtonIcon: {
        width: 15,
        height: 15,
        marginLeft: 6
    },
    leftButtonTitle: {
        // ...AppStyles.regular,
        fontSize: 15,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 1,
        justifyContent: 'center',
        width: width - 180,
        overflow: 'hidden'
    },
    titleText: {
        // ...AppStyles.title,
        fontSize: 17,
    },
    rightButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingRight: 8
    },
    rightButtonIcon: {
        width: 22,
        height: 22
    },
    rightButtonTitle: {
        // ...AppStyles.regular,
        fontSize: 15
    }
});
