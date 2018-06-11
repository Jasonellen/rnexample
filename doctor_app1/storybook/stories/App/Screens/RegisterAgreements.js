// @flow

import React from 'react'
import { View, WebView } from 'react-native'

// Styles
import styles from './Styles/RegisterAgreementsStyle'

import NavItems from '../Navigation/NavItems'

import { Actions } from 'react-native-router-flux'

class RegisterAgreements extends React.Component {
  constructor (props) {
    super(props)

    this.goBack = this.goBack.bind(this)
    this.renderLeftButton = this.renderLeftButton.bind(this)
  }

  goBack () {
    this.props.onBack()
  }

  renderLeftButton () {
    return NavItems.backButton(this.goBack)
  }

  componentDidMount () {
    Actions.refresh({
      renderLeftButton: this.renderLeftButton
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <WebView
            automaticallyAdjustContentInsets={false}
            source={{ uri: this.props.uri }}
            decelerationRate='normal'
            startInLoadingState />
        </View>
      </View>
    )
  }

}

export default RegisterAgreements
