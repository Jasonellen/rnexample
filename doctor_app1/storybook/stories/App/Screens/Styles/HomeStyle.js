// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  addButton: {
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    borderColor: Colors.underlay,
    paddingHorizontal: Metrics.baseMargin
  },
  lastMenuBtn: {
    borderBottomWidth: 0
  },
  menuBtnIcon: {
    textAlign: 'center',
    color: Colors.primary
  },
  menuBtnText: {
    paddingLeft: Metrics.baseMargin,
    color: Colors.primary
  },
  boxesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    paddingTop: Metrics.doubleBaseMargin
  },
  boxContainer: {
    padding: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin
  },
  backgroundContainer: {
    position: 'relative',
    width: 92,
    height: 92,
    borderWidth: 1,
    borderColor: Colors.frost,
    backgroundColor: Colors.primary,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxName: {
    width: 90,
    marginTop: Metrics.baseMargin,
    height: Metrics.doubleBaseMargin,
    lineHeight: Metrics.doubleBaseMargin,
    color: Colors.black,
    textAlign: 'center',
    fontSize: Fonts.size.medium
  },
  boxIcon: {
    backgroundColor: Colors.transparent,
    color: Colors.snow
  }
})
