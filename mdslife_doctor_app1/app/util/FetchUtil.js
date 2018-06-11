/**
 * Created by DB on 16/7/18.
 */

import UserDefaults from './UserDefaults'
import Loader from '../commons/Loader'

export function request(url, method = 'GET', params = {}, successBlock = ()=>{}, failBlock = ()=>{}, loginBlock = ()=>{}) {
    UserDefaults.objectForKey('userInfo', (info) => {
        if (!!info) {
            if (method === 'GET') {
                requestGET(url, {user_id: info.userId, ...params}, successBlock, failBlock, loginBlock, info.token);
            } else {
                requestPOST(url, {user_id: info.userId, ...params}, successBlock, failBlock, loginBlock, info.token);
            }
        } else {
            loginBlock();
        }
    })
}

export function requestGET(url, params = {}, successBlock = ()=>{}, failBlock = ()=>{}, loginBlock = ()=>{}, TOKEN = '') {

    //把传进来的参数加工成GET模式
    let newURL = url;
    let keys = Object.keys(params);
    keys.map((value, index)=> {
        if (index === 0) {
            newURL = url + '?'
        }
        newURL = `${newURL}${value}=${params[value]}`;

        if (index !== keys.length - 1) {
            newURL = newURL + '&'
        }
    });

    let map = {method: 'GET', timeout: 30 * 1000, headers: {'TOKEN': TOKEN}};

    console.log(`requestGET: ${newURL},TOKEN: ${TOKEN}`);

    fetch(newURL, map)
        .then((response) => response.json())
        .then(
            (responseJson) => {

                console.log(responseJson);

                if (responseJson.errcode === 9) {
                    Loader.hide();
                    loginBlock();
                } else if (responseJson.errcode === 0) {
                    successBlock(responseJson.data);
                } else {
                    failBlock(responseJson.errmsg);
                }
            }
        )
        .catch(
            (error) => {
                console.log(error);
                failBlock('Network anomaly');
            }
        )
}

export function requestPOST(url, params = {}, successBlock = ()=>{}, failBlock = ()=>{}, loginBlock = ()=>{}, TOKEN = '') {

    console.log(url);
    console.log(params);

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'TOKEN': TOKEN
        },
        body: JSON.stringify(params),
        timeout: 30 * 1000
    })
        .then((response) => response.json())
        .then(
            (responseJson) => {

                console.log(responseJson);

                if (responseJson.errcode === 9) {
                    Loader.hide();
                    loginBlock();
                } else if (responseJson.errcode === 0) {
                    successBlock(responseJson.data);
                } else {
                    failBlock(responseJson.errmsg);
                }
            }
        )
        .catch(
            (error) => {
                console.log(error);
                failBlock('Network anomaly');
            }
        );
}

export function upLoadImage(url, response, successBlock, failBlack) {
    let formData = new FormData();
    formData.append('file', {uri: response, type: 'image/jpeg', name: 'userImage.jpg'});
   // formData.append('filename', 'file');
   // formData.append('photoDir', 'userImage');
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responseJson) => {
                // let responseJson = eval("(" + responseData + ")");
                console.log(responseJson);
                if (responseJson.errcode === 0) {
                    successBlock(responseJson.data);
                } else {
                     failBlack('Upload failed');
                }
            }
        )
        .catch((error) => {
                console.log(error);
                failBlack('Upload failed');
            }
        )
}

export function gets(url, successCallback, failCallback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            successCallback(JSON.parse(request.responseText))

        } else {
            failCallback()
        }
    };

    request.open('GET', url);
    request.send();
}