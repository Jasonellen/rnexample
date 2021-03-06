/* @flow */

import SideContainerToggler
    from '../../../modules/UI/side_pannels/SideContainerToggler';

import { appNavigate } from '../app';
import { toggleAudioMuted, toggleVideoMuted } from '../base/media';

import defaultToolbarButtons from './defaultToolbarButtons';

import type { Dispatch } from 'redux-thunk';

//张南南 引入文件
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import  Storage  from '../../../App/Lib/Storage';
import { meetingStatusWillChange } from '../app';

type MapOfAttributes = { [key: string]: * };

declare var $: Function;
declare var AJS: Object;
declare var interfaceConfig: Object;

/**
 * Maps (redux) actions to React component props.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {{
 *     _onHangup: Function,
 *     _onToggleAudio: Function,
 *     _onToggleVideo: Function
 * }}
 * @private
 */
export function abstractMapDispatchToProps(dispatch: Dispatch<*>): Object {
    return {
        /**
         * Dispatches action to leave the current conference.
         *
         * @private
         * @returns {void}
         * @type {Function}
         */
        _onHangup() {
            // XXX We don't know here which value is effectively/internally
            // used when there's no valid room name to join. It isn't our
            // business to know that anyway. The undefined value is our
            // expression of (1) the lack of knowledge & (2) the desire to no
            // longer have a valid room name to join.
            dispatch(appNavigate(undefined));

            //张南南  --挂断视频会议回退到进入的页面
            setTimeout(() => {
              Storage.get('lastUrl').then((url)=>{
                NavigationActions.indexWebview({
                  lastUrl:url,
                  type: ActionConst.RESET
                });

                setTimeout(() => {
                  // 退出视频会议模块后，修改会议状态
                  dispatch(meetingStatusWillChange(false))
                }, 500)
              })
            }, 500)
        },

        /**
         * Dispatches an action to toggle the mute state of the
         * audio/microphone.
         *
         * @private
         * @returns {Object} - Dispatched action.
         * @type {Function}
         */
        _onToggleAudio() {
            return dispatch(toggleAudioMuted());
        },

        /**
         * Dispatches an action to toggle the mute state of the video/camera.
         *
         * @private
         * @returns {Object} - Dispatched action.
         * @type {Function}
         */
        _onToggleVideo() {
            return dispatch(toggleVideoMuted());
        }
    };
}

/**
 * Maps parts of media state to component props.
 *
 * @param {Object} state - Redux state.
 * @protected
 * @returns {{
 *     _audioMuted: boolean,
 *     _videoMuted: boolean,
 *     _visible: boolean
 * }}
 */
export function abstractMapStateToProps(state: Object): Object {
    const media = state['features/base/media'];
    const { visible } = state['features/toolbox'];

    return {
        /**
         * Flag showing that audio is muted.
         *
         * @protected
         * @type {boolean}
         */
        _audioMuted: media.audio.muted,

        /**
         * Flag showing whether video is muted.
         *
         * @protected
         * @type {boolean}
         */
        _videoMuted: media.video.muted,

        /**
         * Flag showing whether toolbox is visible.
         *
         * @protected
         * @type {boolean}
         */
        _visible: visible
    };
}

/* eslint-disable flowtype/space-before-type-colon */

/**
 * Takes toolbar button props and maps them to HTML attributes to set.
 *
 * @param {Object} props - Props set to the React component.
 * @returns {MapOfAttributes}
 */
export function getButtonAttributesByProps(props: Object = {})
        : MapOfAttributes {
    let classNames = props.classNames;

    if (classNames) {
        // XXX Make sure to not modify props.classNames because that'd be bad
        // practice.
        classNames = [ ...classNames ];
    }

    props.toggled && classNames.push('toggled');
    props.unclickable && classNames.push('unclickable');

    const result: MapOfAttributes = {
        className: classNames.join(' '),
        'data-container': 'body',
        'data-placement': 'bottom',
        id: props.id
    };

    if (!props.enabled) {
        result.disabled = 'disabled';
    }

    if (props.hidden) {
        result.style = { display: 'none' };
    }

    return result;
}

/* eslint-enable flowtype/space-before-type-colon */

/**
 * Returns an object which contains the default buttons for the primary and
 * secondary toolbars.
 *
 * @returns {Object}
 */
export function getDefaultToolboxButtons(): Object {
    let toolbarButtons = {
        primaryToolbarButtons: new Map(),
        secondaryToolbarButtons: new Map()
    };

    if (typeof interfaceConfig !== 'undefined'
            && interfaceConfig.TOOLBAR_BUTTONS) {
        toolbarButtons
            = interfaceConfig.TOOLBAR_BUTTONS.reduce(
                (acc, buttonName) => {
                    const button = defaultToolbarButtons[buttonName];

                    if (button) {
                        const place = _getToolbarButtonPlace(buttonName);

                        button.buttonName = buttonName;
                        acc[place].set(buttonName, button);
                    }

                    return acc;
                },
                toolbarButtons);
    }

    return toolbarButtons;
}

/**
 * Get place for toolbar button. Now it can be in the primary Toolbar or in the
 * secondary Toolbar.
 *
 * @param {string} btn - Button name.
 * @private
 * @returns {string}
 */
function _getToolbarButtonPlace(btn) {
    return (
        interfaceConfig.MAIN_TOOLBAR_BUTTONS.includes(btn)
            ? 'primaryToolbarButtons'
            : 'secondaryToolbarButtons');
}

/**
 * Returns toolbar class names to add while rendering.
 *
 * @param {Object} props - Props object pass to React component.
 * @returns {Object}
 * @private
 */
export function getToolbarClassNames(props: Object) {
    const primaryToolbarClassNames = [ 'toolbar_primary' ];
    const secondaryToolbarClassNames = [ 'toolbar_secondary' ];

    if (props._visible) {
        const slideInAnimation
            = SideContainerToggler.isVisible ? 'slideInExtX' : 'slideInX';

        primaryToolbarClassNames.push('fadeIn');
        secondaryToolbarClassNames.push(slideInAnimation);
    } else {
        const slideOutAnimation
            = SideContainerToggler.isVisible ? 'slideOutExtX' : 'slideOutX';

        primaryToolbarClassNames.push('fadeOut');
        secondaryToolbarClassNames.push(slideOutAnimation);
    }

    return {
        primaryToolbarClassName: primaryToolbarClassNames.join(' '),
        secondaryToolbarClassName: secondaryToolbarClassNames.join(' ')
    };
}

/**
 * Show custom popup/tooltip for a specified button.
 *
 * @param {string} popupSelectorID - The selector id of the popup to show.
 * @param {boolean} show - True or false/show or hide the popup.
 * @param {number} timeout - The time to show the popup.
 * @returns {void}
 */
export function showCustomToolbarPopup(
        popupSelectorID: string,
        show: boolean,
        timeout: number) {
    AJS.$(popupSelectorID).tooltip({
        gravity: $(popupSelectorID).attr('data-popup'),
        html: true,
        title: 'title',
        trigger: 'manual'
    });

    if (show) {
        AJS.$(popupSelectorID).tooltip('show');

        setTimeout(
            () => {
                // hide the tooltip
                AJS.$(popupSelectorID).tooltip('hide');
            },
            timeout);
    } else {
        AJS.$(popupSelectorID).tooltip('hide');
    }
}
