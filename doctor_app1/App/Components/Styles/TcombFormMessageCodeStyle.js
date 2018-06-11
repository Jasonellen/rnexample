import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  checknumTextboxView: {
    flexDirection: 'row'
  },
  checknumTextbox: {
    flex: 1.5
  },
  checknumButton: {
    flex: 1,
    height: 36,
    borderRadius: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    marginLeft: Metrics.baseMargin
  },
  checknumButtonText: {
    color: Colors.snow,
    fontSize: Fonts.size.medium
  }
})
