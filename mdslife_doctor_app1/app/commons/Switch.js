import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';

export default class Switch extends Component {
    static propTypes = {
        onValueChange: PropTypes.func,
        disabled: PropTypes.bool,
        activeText: PropTypes.string,
        inActiveText: PropTypes.string,
        backgroundActive: PropTypes.string,
        backgroundInactive: PropTypes.string,
        value: PropTypes.bool,
        circleActiveColor: PropTypes.string,
        circleInActiveColor: PropTypes.string,
    };
    static defaultProps = {
        value: true,
        onValueChange: () => null,
        disabled: false,
        backgroundActive: '#83BCF3',
        backgroundInactive: '#D1D7DC',
        circleActiveColor: '#1C7DF1',
        circleInActiveColor: '#1C7DF1'
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value,
            transformSwitch: new Animated.Value(props.value ? 12 : -12),
            backgroundColor: new Animated.Value(props.value ? 75 : -75),
            circleColor: new Animated.Value(props.value ? 75 : -75)
        };
    }

    componentWillReceiveProps(nextProps) {
        const {disabled} = this.props;
        if (nextProps.value === this.props.value) {
            return;
        }
        if (disabled) {
            return;
        }

        this.animateSwitch(nextProps.value);
    }

    handleSwitch = () => {
        const {value} = this.state;
        const {onValueChange, disabled} = this.props;
        if (disabled) {
            return;
        }

        this.animateSwitch(!value);

        onValueChange(!value)
    };

    animateSwitch = (value) => {
        Animated.parallel([
            Animated.spring(this.state.transformSwitch, {
                toValue: value ? 12 : -12,
                duration: 100
            }),
            Animated.timing(this.state.backgroundColor, {
                toValue: value ? 75 : -75,
                duration: 100
            }),
            Animated.timing(this.state.circleColor, {
                toValue: value ? 75 : -75,
                duration: 100
            })
        ]).start();
        this.setState({value: value});
    };

    render() {
        const {
            transformSwitch,
            backgroundColor,
            circleColor,
        } = this.state;

        const {
            backgroundActive,
            backgroundInactive,
            circleActiveColor,
            circleInActiveColor,
            style
        } = this.props;

        const interpolatedColorAnimation = backgroundColor.interpolate({
            inputRange: [-75, 75],
            outputRange: [backgroundInactive, backgroundActive]
        });

        const interpolatedCircleColor = circleColor.interpolate({
            inputRange: [-75, 75],
            outputRange: [circleInActiveColor, circleActiveColor]
        });

        return (
            <TouchableWithoutFeedback
                onPress={this.handleSwitch}
            >
                <Animated.View
                    style={[
                             styles.container,
                             { backgroundColor: interpolatedColorAnimation },
                             style
                          ]}
                >
                    <Animated.View
                        style={[
							styles.animatedContainer,
							{ transform: [{ translateX: transformSwitch }] },
						]}
                    >
                        <Animated.View style={[styles.circle, { backgroundColor: interpolatedCircleColor }]}/>

                    </Animated.View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 29,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'black',
    },
    animatedContainer: {
        flex: 1,
        width: 29,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent'
    },
});
