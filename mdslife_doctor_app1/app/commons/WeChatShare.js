/**
 * Created by DB on 16/7/29.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    Linking
} from 'react-native';

import JsConfig from '../config/jsConfig'
import * as Toast from './Toast'
import Modal from 'react-native-modalbox'
import * as WeChat from 'react-native-wechat'

export default class WeChatShare extends Component {

    constructor(props) {
        super(props);
        this.scene = 0;

        //分享数据
        this.data = {
            title: "麦迪森在线",
            description: '分享自：' + JsConfig.HOST_TITLE,
            thumbImage: JsConfig.API_HOST + '/assets/login/logo-11a894df3ae08446266fcb79d52f47a131be97999be1867baf5f4caecae496ea.png',
            type: 'news',
            webpageUrl: JsConfig.API_HOST
        };

        WeChat.registerApp(JsConfig.WECHAT_APP_ID)
            .then(e => {
                console.log(e)
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        WeChat.removeAllListeners();
    }

    /**
     * 点击分享
     * @param scene 0 好友  1 朋友圈
     */
    openShare = (scene) => {

        this.scene = scene;
        //检查是否安装微信
        WeChat.isWXAppInstalled()
            .then((e) => {
                if (e) {
                    this.isWXAppSupportApi();
                } else {
                    this.openWeChatUrl();
                }
            })
            .catch(() => {
                Toast.showTop('请安装微信!')
            })
    };

    /**
     * 分享给微信好友
     */
    shareToSession = () => {

        WeChat.shareToSession(this.data)
            .then(e => {
                console.log(e);
                if (e.errCode == '0') {
                    Toast.showTop('分享成功!');
                } else {
                    Toast.showTop('抱歉,分享失败!');
                }
                this.refs.modal.close()
            })
            .catch(() => {
                Toast.showTop('抱歉,分享失败!');
                this.refs.modal.close()
            })
    };

    /**
     * 分享到微信朋友圈
     */
    shareToTimeline = () => {

        WeChat.shareToTimeline(this.data)
            .then(e => {
                if (e.errCode == '0') {
                    Toast.showTop('分享成功!');
                } else {
                    Toast.showTop('抱歉,分享失败!');
                }
                this.refs.modal.close()
            })
            .catch(() => {
                Toast.showTop('抱歉,分享失败!');
                this.refs.modal.close()
            })
    };

    /**
     * 检查是否支持微信分享
     */
    isWXAppSupportApi = () => {

        WeChat.isWXAppSupportApi()
            .then(e => {
                console.log(e);
                if (e){
                    if (this.scene === 0) {
                        this.shareToSession()
                    } else {
                        this.shareToTimeline()
                    }
                } else {
                    Toast.showTop('抱歉当前版本不支持微信分享!');
                    this.refs.modal.close()
                }
            })
            .catch(() => {
                Toast.showTop('抱歉当前版本不支持微信分享!');
                this.refs.modal.close()
            })
    };

    /**
     * 前往下载微信
     */
    openWeChatUrl = () => {
        WeChat.getWXAppInstallUrl()
            .then(e => {
                Linking.openURL(e)
            })
            .catch()
    };

    openModal = () => {
        this.refs.modal.open();
    };

    render() {

        return (
            <Modal style={styles.modal} position={"center"} ref={"modal"} isDisabled={false}>
                <Text style={styles.text}>分享到</Text>
                <View style={styles.rowView}>
                    <TouchableOpacity style={styles.imageView}
                                      activeOpacity={0.8}
                                      onPress={ () => this.openShare(0)}
                    >
                        <Image style={styles.image}
                               source={require('../images/share_icon_wechat.png')}
                        />
                        <Text style={styles.weChatText}>微信好友</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.imageView, {marginLeft: 40}]}
                                      activeOpacity={0.8}
                                      onPress={ () => this.openShare(1)}
                    >
                        <Image style={styles.image}
                               source={require('../images/share_icon_moments.png')}
                        />
                        <Text style={styles.weChatText}>朋友圈</Text>
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
        height: 166,
        width: 280,
        backgroundColor: '#FFF',
        borderRadius: 5
    },
    text: {
        color: "#000",
        fontSize: 16,
        fontWeight: '500'
    },
    image: {
        height: 45,
        width: 45,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    weChatText: {
        color: '#000',
        marginTop: 10,
        fontSize: 14
    }
});

