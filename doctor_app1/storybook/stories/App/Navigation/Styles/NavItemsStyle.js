// @flow

import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../Themes/'

const navButton = {
  backgroundColor: Colors.transparent,
  justifyContent: 'center'
}

export default StyleSheet.create({
  backButton: {
    ...navButton,
    marginHorizontal: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },
  businessCardButton: {
    ...navButton,
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  }
})
