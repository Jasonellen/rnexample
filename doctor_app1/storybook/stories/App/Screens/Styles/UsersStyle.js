// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 20

  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  headLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  headRight: {
    height: 20,
    marginTop: 10
  },
  headImage: {
    height: 50,
    width: 50,
    marginRight: 15
  },
  headContent: {
    flex: 1,
    paddingVertical: 5
  },
  headtitle: {
    flex: 1,
    flexDirection: 'row'
  },
  headtitle1: {
    fontSize: 16,
    marginRight: 5
  },
  headtitle2: {
    fontSize: 12,
    lineHeight: 16
  },
  headId: {
    fontSize: 12,
    color: '#666'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  navList: {
    flex: 1,
    alignItems: 'center',
  },
  navImg: {
    fontSize: 30,
    color: Colors.primary,
    marginBottom: 6
  },
  content: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  contentList: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#999'
  },
  noBorder: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  contentImg: {
    fontSize: 30,
    color: Colors.primary,
    marginLeft: 30,
    marginRight: 20
  },
  contentText: {
    marginTop: 8
  },
  textTwoBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTwo: {
    marginRight: 10,
    marginTop: 8,
    color: '#666'
  },
  service: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  }

})
