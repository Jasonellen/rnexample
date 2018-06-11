// @flow

import React,{ Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  ListView
} from 'react-native'

import { connect } from 'react-redux'
//action
import DoctorRegisterActions from '../Redux/DoctorRegisterRedux'
// Styles
import styles from './Styles/SelectHospitalStyle'
class SelectHospital extends Component {

  componentDidMount () {
    // 获取对应省下面的所有医院
    this.props.hospitalData()
  }

  _render (rowData) {
    return (
      <View style={styles.item}>
        <Text
          style={styles.itemText}
          onPress={()=>this.props.hospitalClick(rowData.name, rowData.id)}
        >{rowData.name}</Text>
      </View>
    )
  }

  render () {
    const {
      proName,
      areaName,
      hospitalData
    }= this.props.state

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const ListViewData = ds.cloneWithRows(hospitalData)

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.item}>
          <Text style={styles.itemText}>当前位置</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>新建医院</Text>
        </View>
        <View style={styles.item}>
          <Text
            // style={this.state.cityActive === false ? styles.itemText : styles.itemTextActive}
            style={styles.itemText}
          >{proName}</Text>
        </View>
        <View style={styles.item}>
          <Text
            style={styles.itemText}
          >{areaName == '请输入地区'? '东城区' : areaName}</Text>
        </View>
        <ListView
          dataSource={ListViewData}
          renderRow={this._render.bind(this)}
          automaticallyAdjustContentInsets
          showsVerticalScrollIndicator={false}
          enableEmptySections
        />
      </View>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    state: state.doctorRegister
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  hospitalData: () => dispatch(DoctorRegisterActions.hospitalData()),
  hospitalClick: (name,id) => dispatch(DoctorRegisterActions.hospitalClick(name,id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectHospital)
