import { ReducerRegistry } from '../base/redux';

import { APP_WILL_MOUNT, APP_WILL_UNMOUNT, MEETING_STATUS_WILL_CHANGE } from './actionTypes';

ReducerRegistry.register('features/app', (state = {}, action) => {
    switch (action.type) {
    case APP_WILL_MOUNT:
        if (state.app !== action.app) {
            return {
                ...state,

                /**
                 * The one and only (i.e. singleton) App instance which is
                 * currently mounted.
                 *
                 * @type {App}
                 */
                app: action.app
            };
        }
        break;

    case APP_WILL_UNMOUNT:
        if (state.app === action.app) {
            return {
                ...state,
                app: undefined
            };
        }
        break;
    case MEETING_STATUS_WILL_CHANGE:
        return {
            ...state,
            inMeeting: action.inMeeting
        };
        break;
    }

    return state;
});
