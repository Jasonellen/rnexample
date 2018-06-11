// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

const addButtonRadius = 35

const addButtonTop = Metrics.screenHeight - addButtonRadius * 6

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.space
  },
  box: {
    flex: 1,
    backgroundColor: Colors.secondary,
    position: 'absolute',
    top: addButtonTop,
    left: Metrics.screenWidth / 2 - addButtonRadius,
    width: addButtonRadius * 2,
    height: addButtonRadius * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: addButtonRadius
  },
  expandedBox: {
    backgroundColor: Colors.secondary,
    position: 'absolute',
    top: addButtonTop,
    left: Metrics.screenWidth / 2 - addButtonRadius,
    width: addButtonRadius * 2,
    height: addButtonRadius * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: addButtonRadius
  },
  addButton: {
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  scaleContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    top: 0,
    left: 0
  },
  addBoxAnimatedContainer: {
    position: 'absolute',
    top: addButtonTop - Metrics.screenWidth / 3 + 300
  },
  addBoxContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth / 3,
    height: Metrics.screenWidth / 3,
    margin: 0
  },
  boxText: {
    position: 'absolute',
    bottom: 15,
    width: Metrics.screenWidth / 3,
    textAlign: 'center',
    left: 0,
    backgroundColor: Colors.transparent
  },
  boxIcon: {
    position: 'relative',
    top: -10
  },
  streamRow: {
    flexDirection: 'row'
  },
  streamItemWrapper: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow
  },
  streamItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  streamIcon: {
    textAlign: 'center',
    marginBottom: Metrics.baseMargin,
    color: Colors.primary
  },
  streamText: {
    textAlign: 'center',
    left: 0,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.regular
  },
  videoLabelContainer: {
    ...ApplicationStyles.darkLabelContainer
  },
  videoLabel: {
    ...ApplicationStyles.darkLabel
  },
  list: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  listImg: {
    flex: 1,
    height: 60,
    marginRight: 20,
    justifyContent: 'flex-end'
  },
  listImgText: {
    backgroundColor: 'rgba(255,102,102,.5)',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 3
  },
  hospital: {
    fontSize: 12,
    color: '#999',
    marginTop: 2
  },
  priceRow: {
    flexDirection: 'row',
    marginTop: 8
  },
  price: {
    flex: 2,
    color: Colors.primary
  },
  priceButton: {
    flex: 1,
    height: 20,
    borderColor: '#ccc'
  },
  priceButtonText: {
    fontSize: Fonts.size.medium
  }
})
