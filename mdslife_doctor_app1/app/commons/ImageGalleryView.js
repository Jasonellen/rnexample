/**
 * Created by DB on 16/7/5.
 * 图片墙
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';

import Gallery from 'react-native-gallery';
import Icon from 'react-native-vector-icons/Ionicons';


export default class ImageGalleryView extends Component {

    static PropTypes = {
        imageURLs: PropTypes.array,
        initialPage: PropTypes.object
    };

    static defaultProps = {
        imageURLs: [],
        initialPage: 1,
    };

    render() {
        let statusBar = 0;

        if (Platform.OS === 'ios') {
            statusBar = 20
        }
        return (
            <View style={{flex: 1}}>


                <Gallery
                    style={{backgroundColor: 'black'}}
                    initialPage={parseInt(this.props.initialPage)}
                    pageMargin={20}
                    images={this.props.imageURLs}
                />

                <View style={[styles.container, {top: statusBar}]}>

                    <TouchableOpacity style={[styles.button, {marginLeft: 8}]}
                                      onPress={()=> {
                                          this.props.navigator.pop()
                                      }}
                    >
                        <Icon style={{backgroundColor: 'transparent'}}
                              name="ios-arrow-back-outline" size={24} color='white'/>
                    </TouchableOpacity>

                </View>

            </View>
        );

    }
}

const devWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 44,
        width: devWidth,
        position: 'absolute',
        left: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#b2b2b2a5',
        width: 30,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }
});