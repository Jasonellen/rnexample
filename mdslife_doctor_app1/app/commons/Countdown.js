/**
 * Created by guguyanhua on 12/11/15.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class CountDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: props.time || 60,
            disabled: false,
            text:'Send Code'
        };
    }

    componentDidMount() {
       // this._countdown();
    }

    componentWillUnmount(){
        clearInterval(this.setInterval);
    }

    _onPress = () => {

        if (this.state.disabled) {
            //nothing
        } else {

            const {onPress} = this.props;
            onPress && onPress()
        }
    };

    onStart = () => {
        this.setState({disabled: true});
        this._countdown();
    };

    // onEnd = () => {
    //
    // }

    _countdown = () => {

        this.setInterval = setInterval(() => {
            let time = this.state.time - 1;
            this.setState({
                time: time,
                text: `${time} s`
            });
            if (time === 0) {
                clearInterval(this.setInterval);
                this.setState({disabled: false});
                this.setState({
                    time: this.props.time || 60,
                    text: 'Again Send'
                });
            }
        },1000);
    };

    render() {

        let component;

        const {disabledTextStyle, buttonStyle, textStyle} = this.props;
        const {disabled, text} = this.state;

        if (disabled) {
            component =
                <View
                    style={[styles.wrapper,buttonStyle]}
                >
                    <Text style={[styles.text,disabledTextStyle]}>{text}</Text>
                </View>
        } else {
            component =
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.wrapper,buttonStyle]}
                    onPress={this._onPress}
                >
                    <Text style={[styles.text,textStyle]}>{text}</Text>
                </TouchableOpacity>
        }
        return (
            component
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#191919',
        fontSize:15
    },
    wrapper: {
        backgroundColor: '#D8D8D8',
        alignItems:'center',
        justifyContent:'center',
        width:96,
        height:34
    }
});
