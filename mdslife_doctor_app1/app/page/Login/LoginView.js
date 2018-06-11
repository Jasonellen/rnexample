import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native';

import NavBar from '../../commons/NavigationBar'

import * as http from '../../util/Http'
import {Images, Metrics} from '../../themes'

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: 0,
        };
    }

    async componentDidMount() {
        try {
            const data = await http.get(`https://doctor.mdslife.com/api/v1/users/current_user`, {token: 'asdadasdasdasd'});

            log(data);

        } catch (e) {
            log(e, 123);
        }


    }

    render() {

        return (
            <Image
                style={styles.container}
                source={Images.loginBG}
            >
                <NavBar
                    title={'登录'}
                    showLeftDefault={false}
                />
                <ScrollView
                    style={styles.scroll}
                    bounces={false}
                >
                    <View style={styles.midView}>
                        <Image
                            style={styles.log}
                            source={Images.logo}
                        />

                    </View>
                </ScrollView>

            </Image>
        );
    }
}

const midViewH = (Metrics.screenHeight - 64) * 0.75;

const styles = StyleSheet.create({
    container: {
        height: Metrics.screenHeight,
        width: Metrics.screenWidth
    },
    scroll: {
        flex:1,
        // backgroundColor:'red'
    },
    midView: {
        margin: 40,
        backgroundColor: '#fff',
        // alignSelf:'center',
        height: midViewH,
        marginTop: (Metrics.screenHeight - midViewH - 64) / 2,
        // justifyContent:'center',
        alignItems:'center',
        borderRadius: 5
    },
    log: {
        height: Metrics.screenWidth * 0.25,
        width: Metrics.screenWidth * 0.25,
        marginTop: 20
    }
});