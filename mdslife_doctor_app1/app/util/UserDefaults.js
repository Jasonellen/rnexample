/**
 * Created by DB on 16/6/30.
 * 本地存储
 */
'use strict';

import { AsyncStorage } from 'react-native';

export default class UserDefaults {

    static setObject(key, value) {
        AsyncStorage.setItem(key,JSON.stringify(value));
    }

    static objectForKey(key, action) {

        AsyncStorage.getItem(key,(err,result)=>{
            if(result !== null) {
                const rawData = JSON.parse(result);
                action(rawData)
            } else {
                action(null)
            }
        })
    }

    static removeObject(key) {
        AsyncStorage.removeItem(key);
    }

    static removeAllObject() {
        AsyncStorage.clear();
    }
}
