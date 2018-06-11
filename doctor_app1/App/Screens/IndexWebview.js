// @flow

import React from 'react'
import {
  View,
  Alert,
  Linking,
  Platform,
  NetInfo,
  NativeAppEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// external libs
import { toastShort } from '../Lib/ToastUtil'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

import JsConfig from '../Config/JsConfig'

import WebViewApp from '../Components/WebViewApp'

import LoadingView from '../Components/LoadingView'

// Styles
import styles from './Styles/IndexWebviewStyle'

import {
  isFirstTime,
  isRolledBack,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess
} from 'react-native-update'

const appKey = JsConfig['PUSHY_APP_KEY'][Platform.OS]

class IndexWebview extends React.Component {
  constructor (props) {
    super(props)
    this.state = { updateInProgress: false, progressPercent: null, unzipPercent: null, networkType: null }

    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this)

    this.doUpdate = this.doUpdate.bind(this)
    this.checkUpdate = this.checkUpdate.bind(this)
  }

  // 去掉热更新
  // componentWillMount () {
  //   if (appKey) {
  //     if (isRolledBack) {
  //       Alert.alert('提示', '刚刚更新失败了,版本被回滚.')
  //     } else if (isFirstTime) {
  //       markSuccess()
  //     };
  //   }
  //
  //   this.hotUpdateSubscription = NativeAppEventEmitter.addListener(
  //     'RCTHotUpdateDownloadProgress',
  //     (params) => {
  //       this.setState({progressPercent: (params.received * 100 / params.total) + '%'})
  //     }
  //   )
  //
  //   this.hotUpdateUnzipSubscription = NativeAppEventEmitter.addListener(
  //     'RCTHotUpdateUnzipProgress',
  //     (params) => {
  //       this.setState({unzipPercent: (params.received * 100 / params.total) + '%'})
  //     }
  //   )
  //
  //   this.syncNetworkType()
  // }
  //
  // componentDidMount () {
  //   if (appKey) {
  //     // 等待networkType更新
  //     setTimeout(() => { this.shouldSync() && this.checkUpdate() }, 500)
  //   }
  // }
  //
  // componentWillUnmount () {
  //   this.hotUpdateSubscription.remove()
  //   this.hotUpdateUnzipSubscription.remove()
  // }


  /**
   * 同步网络信息, iOS平台需监听 change 事件
   * iOS平台: NetInfo.fetch().done() - always returns unknown
   * issue: https://github.com/facebook/react-native/issues/8615
   */
  syncNetworkType () {
    if (Platform.OS === 'ios') {
      NetInfo.addEventListener(
        'change',
        this.handleFirstConnectivityChange
      )
    } else {
      NetInfo.fetch().done((reach) => {
        this.handleFirstConnectivityChange(reach)
      })
    }
  }

  doUpdate (info) {
    this.setState({updateInProgress: true})

    downloadUpdate(info).then(hash => {
      this.setState({updateInProgress: false})

      Alert.alert('提示', '下载完毕, 是否重启应用?', [
        {text: '是', onPress: () => { switchVersion(hash) }},
        {text: '否'},
        {text: '下次启动时', onPress: () => { switchVersionLater(hash) }}
      ])
    })
    .catch(() => {
      this.setState({updateInProgress: false})

      Alert.alert('提示', '更新失败.')
    })
  };

  checkUpdate () {
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) }}
        ])
      } else if (info.upToDate) {
        // do nothing
      } else {
        Alert.alert('提示', '检查到新的版本' + info.name + ', 是否下载?\n' + info.description, [
          {text: '是', onPress: () => { this.doUpdate(info) }},
          {text: '否'}
        ])
      }
    }).catch(() => {
      toastShort('检查更新失败')
    })
  };

  /**
   * 更新网络信息，iOS平台需移除 listener: handleFirstConnectivityChange
   */
  handleFirstConnectivityChange (networkType) {
    this.setState({networkType})

    if (Platform.OS === 'ios') {
      NetInfo.removeEventListener(
        'change',
        this.handleFirstConnectivityChange
      )
    }
  }

  /**
   * 根据网络信息，判断是否同步热更新信息
   *
   * @source noder-react-native
   * @link https://github.com/soliury/noder-react-native/blob/master/src/utils/codePushSync.js
   */
  shouldSync () {
    const reach = this.state.networkType

    if (__DEV__) return false

    if (Platform.OS === 'ios') {
      return reach === 'wifi'
    } else {
      return ['WIFI', 'VPN'].indexOf(reach) > -1
    }
  }

  renderLoading (progressPercent, unzipPercent) {
    let desc = '正在下载更新'
    if (progressPercent) {
      desc += ' ' + progressPercent
    }

    if (unzipPercent) {
      desc = '正在安装 ' + unzipPercent
    }

    return <LoadingView desc={desc} />
  }

  render () {
    if (this.state.updateInProgress) {
      return this.renderLoading(this.state.progressPercent, this.state.unzipPercent)
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <WebViewApp title={JsConfig.HOST_TITLE} lastUrl={this.props.lastUrl} {...this.props} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onWebViewUrlChange: (url) => {
      if (!url) return

      if (url.endsWith('/home/meeting') || url.endsWith('/home/meeting/')) {
        NavigationActions.switchToMeetingScreen({room: '123131412314325253414123123143231'})
      }
    },
    shouldSaveBrowsingHistory: (url) => {
      if (!url) return false

      if (url.endsWith('/home/meeting') || url.endsWith('/home/meeting/')) {
        return false
      }

      return true
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexWebview)
