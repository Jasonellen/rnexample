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
let ds
class SelectArea extends React.Component {
  constructor (props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dsRight = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds,
      dataSourceRight: dsRight,
      showIndex: '0', // 当前显示的index
      proName: '北京市',
      proId: '10',  // 省id
      cityId: '',
      data: []
    }
  }

  componentDidMount () {
    // 获取所有的省份
    request.get('https://doctor.mdslife.com/api/v1/regions')
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.regions),
          data: data.regions
        })
      })
    // 获取默认省份(北京市下面所有的市区)
    request.get('https://doctor.mdslife.com/api/v1/regions?region=10')
      .then((data) => {
        this.setState({
          dataSourceRight: this.state.dataSourceRight.cloneWithRows(data.regions)
        })
      })
  }
  click (rowData, rowId) {
    this.setState({
      showIndex: rowId,
      dataSource: ds.cloneWithRows(this.state.data),
      proId: rowData.region_code
    })
    // 获取点击省份对应的所有市区
    request.get(`https://doctor.mdslife.com/api/v1/regions?region=${rowData.region_code}`)
      .then((data) => {
        this.setState({
          dataSourceRight: this.state.dataSourceRight.cloneWithRows(data.regions),
          proName: rowData.region_name,
        })
      })
  }
  clickRight (rowData) {
    request.get(`https://doctor.mdslife.com/api/v1/hospitals?region=${rowData.region_code}`)
      .then((data) => {
        this.setState({
          cityId: rowData.region_id
        })
        this.props.setArea(data.hospitals, this.state.proName, rowData.region_name, this.state.proId, this.state.cityId)
      })
  }
  _render (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={this.click.bind(this, rowData, rowId)}>
        <View style={styles.listLeftBottom}>
          <Text style={this.state.showIndex === rowId ? styles.listRight : styles.list}>{rowData.region_name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderRight (rowData) {
    return (
      <TouchableOpacity onPress={this.clickRight.bind(this, rowData)}>
        <Text style={styles.listRight}>{rowData.region_name}</Text>
      </TouchableOpacity>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ScrollView style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._render.bind(this)}
            automaticallyAdjustContentInsets
            showsVerticalScrollIndicator={false}
            enableEmptySections
          />
        </ScrollView>
        <ScrollView style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSourceRight}
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

export default SelectArea
