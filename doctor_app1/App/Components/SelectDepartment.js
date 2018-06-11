// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  ListView
} from 'react-native'

import { connect } from 'react-redux'
//action
import DoctorRegisterActions from '../Redux/DoctorRegisterRedux'
// Styles
import styles from './Styles/SelectDepartmentStyle'

class SelectDepartment extends React.Component {

  componentDidMount () {
    // 获取所有的科室
    this.props.departmentDataFn()
    // 获取默认第一个科室id=1下面的科室明细
    this.props.departmentListDataFn()
  }

  _render (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={()=>this.props.departmentClick(rowId, rowData.id)}>
        <View style={styles.listLeftBottom}>
          <Text style={this.props.state.departmentShowIndex === rowId ? styles.listRight : styles.list}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderRight (rowData) {
    return (
      <TouchableOpacity onPress={()=>this.props.departmentListClick(rowData.name, rowData.id)}>
        <Text style={styles.listRight}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }
  render () {
    const {
      departmentData,
      departmentListData,
    } = this.props.state

    const{
      departmentDataFn,
      departmentListDataFn
    }=this.props

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const ListViewData = ds.cloneWithRows(departmentData)
    const ListViewDataRight = ds.cloneWithRows(departmentListData)
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ScrollView style={{flex: 1}}>
          <ListView
            dataSource={ListViewData}
            renderRow={this._render.bind(this)}
            automaticallyAdjustContentInsets
            showsVerticalScrollIndicator={false}
            enableEmptySections
          />
        </ScrollView>
        <ScrollView style={{flex: 1}}>
          <ListView
            dataSource={ListViewDataRight}
            renderRow={this._renderRight.bind(this)}
            automaticallyAdjustContentInsets
            showsVerticalScrollIndicator={false}
            enableEmptySections
          />
        </ScrollView>
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
  departmentDataFn: () => dispatch(DoctorRegisterActions.departmentData()),
  departmentListDataFn: () => dispatch(DoctorRegisterActions.departmentListData()),
  departmentClick: (departmentShowIndex,id) => dispatch(DoctorRegisterActions.departmentClick(departmentShowIndex,id)),
  departmentListClick: (departmentName,id) => dispatch(DoctorRegisterActions.departmentListClick(departmentName,id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectDepartment)

