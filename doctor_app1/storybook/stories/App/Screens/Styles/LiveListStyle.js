// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#f2f2f2'
  },
  list: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
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
  price: {
    color: Colors.primary,
    marginTop: 8
  }

})
