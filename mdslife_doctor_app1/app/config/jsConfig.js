/**
 * Created by DB on 2017/5/25.   https://jitsi.mdsonline.cn  https://meet.jit.si
 */

const config = {
    development: {
        'API_HOST': 'https://doctor.mdslife.com',
        'HOST_TITLE': '麦迪森在线(开发环境)',
        'PUSHY_APP_KEY': {
            'ios': '',
            'android': ''
        },
        'WECHAT_APP_ID': 'wx6baabfbf39121b5b'
    },
    staging: {
        'API_HOST': 'https://doctor.mdsonline.cn',
        'HOST_TITLE': '麦迪森在线(测试环境)',
        'PUSHY_APP_KEY': {
            'ios': 'XrMk2y61ctG5233tdmuhDidsJ5OVqNBZ',
            'android': 'bK_Vffjl9W65sfhTjs1WGqcTXHhl1glS'
        },
        'WECHAT_APP_ID': 'wx6baabfbf39121b5b'
    },
    production: {
        'API_HOST': 'https://doctor.mdshealth.cn',
        'HOST_TITLE': '麦迪森在线',
        'PUSHY_APP_KEY': {
            'ios': 'XrMk2y61ctG5233tdmuhDidsJ5OVqNBZ',
            'android': 'XSVCqMNDzNJ_sK4A2zyrpGBLPX7-sXqs'
        },
        'WECHAT_APP_ID': 'wx6baabfbf39121b5b'
    },
    common: {
        'VERSION_NAME': {
            'ios': '1.0.4',
            'android': '1.0.6'
        }
    }
};

export default {
    ...config.development,
    ...config.common
};