import {Dimensions, Platform, PixelRatio, StyleSheet} from 'react-native'

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
    pixelRation: PixelRatio.get(),
    pixel1: 1 / PixelRatio.get(),
    section: 25,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    statusBarHeight: 20,
    buttonRadius: 4,
    iconSize:40,
    space:10,
    hairlineWidth: StyleSheet.hairlineWidth
};

export default metrics
