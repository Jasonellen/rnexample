// 将不需要在原生代码中访问的配置放置在javascript中，便于在原生部分不做修改的情况下，发布热更新

import Config from 'react-native-config';

import env from '../../.env.js';

const JsConfig = Object.assign({}, env[Config.ENV], env['common']);

export default JsConfig;
