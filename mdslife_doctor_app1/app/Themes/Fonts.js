import {Platform} from 'react-native'

// const type = {
//     light: (Platform.OS === 'ios') ? '.PingFang-SC-Light' : 'PingFangLight',
//     regular: (Platform.OS === 'ios') ? '.PingFang-SC-Regular' : 'PingFangRegular',
//     medium: (Platform.OS === 'ios') ? '.PingFang-SC-Medium' : 'PingFangMedium'
// };

const size = {
    medium: 16,
    regular: 14,
    small: 12,
};

const style = {
    regular: {
        // fontFamily: type.regular,
        fontSize: size.regular
    },
    description: {
        // fontFamily: type.light,
        fontSize: size.small
    },
    title: {
        // fontFamily: type.medium,
        fontSize: size.medium
    }
};

export default {
    size,
    style
}

