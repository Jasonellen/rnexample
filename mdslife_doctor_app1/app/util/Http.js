/**
 * Created by DB on 2017/6/2.
 */

const timeoutPromise = (fetch_promise, timeout) => {
    let abort_fn = null;

    //这是一个可以被reject的promise
    let abort_promise = new Promise((resolve, reject) => {
        abort_fn = () => {
            reject('abort promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function() {
        abort_fn();
    }, timeout * 1000);

    return abortable_promise;
};

const get = (url, params = {}, timeout = 30) => {

    //默认参数
    let defaultParams = {};

    //拼接默认参数
    let allParams = {...params, ...defaultParams};

    let paramArr = [];
    if (Object.keys(allParams).length !== 0) {
        for (const key in allParams) {
            paramArr.push(`${key}=${allParams[key]}`);
        }
    }
    const  urlStr = `${url}?${paramArr.join('&')}`;

    const fetch_promise = fetch(urlStr).then((response) => {
        let ct = response.headers.get('Content-Type');
        console.log(ct);

        return response.json()

    });

    return timeoutPromise(fetch_promise, timeout);
};

const post = (url, params = {}, timeout = 30) => {

};

export { get }