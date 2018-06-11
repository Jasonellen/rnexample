/**
 * Created by DB on 2016/12/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';

import Modal from 'react-native-modalbox'

const {width} = Dimensions.get('window');

export default class ModelAlert extends Component {

    open = () => {
        this.refs.modal.open();
    };

    close = () => {
        this.refs.modal.close();
    };

    onPress = (v) => {
        const { onPress } = this.props;
        onPress && onPress(v);
        this.refs.modal.close();
    };

    render() {

        const {title} = this.props;

        return (
            <Modal style={styles.modal} position={"center"} ref={"modal"} isDisabled={false}>
                <Text style={styles.text}>{title}</Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.button1}
                                      activeOpacity={0.8}
                                      onPress={() => {this.onPress(false)}}
                    >
                        <Text style={styles.buttonText}>cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2}
                                      activeOpacity={0.8}
                                      onPress={() => {this.onPress(true)}}
                    >
                        <Text style={[styles.buttonText,{color:'#fff'}]}>confirm</Text>
                    </TouchableOpacity>
                </View>


            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: width - 60,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    text: {
        color: "#1E1E1E",
        fontSize: 16,
        fontWeight: '400'
    },
    button1: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        height:40,
        borderRadius: 20,
        borderWidth:1,
        borderColor:'#B1B1B1',
        marginHorizontal:15
    },
    button2: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        height:40,
        borderRadius: 20,
        backgroundColor:'#1C7DF1',
        marginHorizontal:15
    },
    buttonText: {
        color: "#B1B1B1",
        fontSize: 14,
    }
});

