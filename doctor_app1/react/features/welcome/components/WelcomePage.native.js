import React from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';

import { translate } from '../../base/i18n';
import { Link } from '../../base/react';
import { ColorPalette } from '../../base/styles';

import { AbstractWelcomePage, _mapStateToProps } from './AbstractWelcomePage';
import { styles } from './styles';

/**
 * The URL at which the privacy policy is available to the user.
 */
const PRIVACY_URL = 'https://jitsi.org/meet/privacy';

/**
 * The URL at which the user may send feedback.
 */
const SEND_FEEDBACK_URL = 'mailto:support@jitsi.org';

/**
 * The URL at which the terms (of service/use) are available to the user.
 */
const TERMS_URL = 'https://jitsi.org/meet/terms';

/**
 * The native container rendering the welcome page.
 *
 * @extends AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage {
    /**
     * WelcomePage component's property types.
     *
     * @static
     */
    static propTypes = AbstractWelcomePage.propTypes

    /**
     * 自定义修改，进入视频会议模块后，进入会议放假
     *
     */
    componentWillMount() {
      this._joinDefaultRoom()
    }

    /**
     * 自定义修改，视频画面加载完成后，进入会议房间
     *
     */
    componentDidUpdate() {
      this._joinDefaultRoom()
    }

    _joinDefaultRoom() {
      if (!this.props.inMeeting) {
        if (this.props._localVideoTrack && this.props.defaultRoomId) {
          if (this.props.defaultRoomId !== this.state.room) {
              this.setState({ room: this.props.defaultRoomId }, this._onJoin)
          }
        }
      }
    }

    /**
     * Renders a prompt for entering a room name.
     *
     * @returns {ReactElement}
     */
    render() {
        return (
            <View style = { styles.container }>
                {
                    this._renderLocalVideo()
                }
                {
                    this._renderLocalVideoOverlay()
                }
            </View>
        );
    }

    /**
     * Renders legal-related content such as Terms of service/use, Privacy
     * policy, etc.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderLegalese() {
        // 自定义修改，不显示条款信息
        return null

        const { t } = this.props;

        return (
            <View style = { styles.legaleseContainer }>
                <Link
                    style = { styles.legaleseItem }
                    url = { TERMS_URL }>
                    { 'welcomepage.terms' }
                </Link>
                <Link
                    style = { styles.legaleseItem }
                    url = { PRIVACY_URL }>
                    { 'welcomepage.privacy' }
                </Link>
                <Link
                    style = { styles.legaleseItem }
                    url = { SEND_FEEDBACK_URL }>
                    { 'welcomepage.sendFeedback' }
                </Link>
            </View>
        );
    }

    /**
     * Renders a View over the local video. The latter is thought of as the
     * background (content) of this WelcomePage. The former is thought of as the
     * foreground (content) of this WelcomePage such as the room name input, the
     * button to initiate joining the specified room, etc.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderLocalVideoOverlay() {
        const { t } = this.props;

        return (
            <View style = { styles.localVideoOverlay }>
                <View style = { styles.roomContainer }>
                    <Text style = { styles.title }>
                        { '麦迪森会议...' }
                    </Text>
                    {/* 自定义修改，隐藏输入房间号功能
                    <TextInput
                        accessibilityLabel = { 'Input room name.' }
                        autoCapitalize = 'none'
                        autoComplete = { false }
                        autoCorrect = { false }
                        autoFocus = { false }
                        onChangeText = { this._onRoomChange }
                        placeholder = { 'welcomepage.roomnamePlaceHolder' }
                        style = { styles.textInput }
                        underlineColorAndroid = 'transparent'
                        value = { this.state.room } />
                    <TouchableHighlight
                        accessibilityLabel = { 'Tap to Join.' }
                        disabled = { this._isJoinDisabled() }
                        onPress = { this._onJoin }
                        style = { styles.button }
                        underlayColor = { ColorPalette.white }>
                        <Text style = { styles.buttonText }>
                            { 'welcomepage.join' }
                        </Text>
                    </TouchableHighlight>
                    */}
                </View>
                {
                    this._renderLegalese()
                }
            </View>
        );
    }
}

export default connect(_mapStateToProps)(WelcomePage);
