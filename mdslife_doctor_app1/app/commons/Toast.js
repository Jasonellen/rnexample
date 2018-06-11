/**
 * Created by DB on 16/6/30.
 */

import RootToast from 'react-native-root-toast';

export let showTop = (message) => {
    RootToast.show(message, {position: RootToast.positions.TOP});
};

export let showBottom = (message) => {
    RootToast.show(message, {position: RootToast.positions.BOTTOM});
};

export let showCenter = (message) => {
    RootToast.show(message, {position: RootToast.positions.CENTER});
};