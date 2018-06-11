'use strict'

import {
    NativeModules
} from 'react-native'

let ImagePicker = NativeModules.DBImagePickerManager;

module.exports = {
    show(count) {
        return ImagePicker.show(count)
    }
};