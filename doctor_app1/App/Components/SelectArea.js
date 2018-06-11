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

import request from '../Services/request'
// Styles
import styles from './Styles/SelectAreaStyle'
import { connect } from 'react-redux'
//action
import DoctorRegisterActions from '../Redux/DoctorRegisterRedux'


class SelectArea extends React.Component {

  componentDidMount () {
    // 获取所有的省份
    this.props.areaDataFn()
    // 获取默认省份(北京市下面所有的市区)
    this.props.cityDataFn()

  }

  _render (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={()=>this.props.areaClick( rowId, rowData.region_code, rowData.region_name, rowData.region_id )}>
        <View style={styles.listLeftBottom}>
          <Text style={this.props.state.areaShowIndex === rowId ? styles.listRight : styles.list}>{rowData.region_name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderRight (rowData) {
    return (
      <TouchableOpacity onPress={()=>this.props.areaClickRight( rowData.region_name, rowData.region_id )}>
        <Text style={styles.listRight}>{rowData.region_name}</Text>
      </TouchableOpacity>
    )
  }
  render () {
    const {
      areaData,
      cityData,
    } = this.props.state

    const{
      areaDataFn,
      cityDataFn
    }=this.props

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const ListViewData = ds.cloneWithRows(areaData)
    const ListViewDataRight = ds.cloneWithRows(cityData)
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
  areaDataFn: () => dispatch(DoctorRegisterActions.areaData()),
  cityDataFn: () => dispatch(DoctorRegisterActions.cityData()),
  areaClick: (areaShowIndex,proId,proName, regionId) => dispatch(DoctorRegisterActions.areaClick(areaShowIndex,proId,proName, regionId)),
  areaClickRight: (cityName,cityId) => dispatch(DoctorRegisterActions.areaClickRight(cityName,cityId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectArea)
