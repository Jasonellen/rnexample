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
import styles from './Styles/SelectprofessionStyle'
let ds
class Selectprofession extends React.Component {
  constructor (props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dsRight = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds,
      dataSourceRight: dsRight,
      showIndex: '0',
      data: []
    }
  }

  componentDidMount () {
    // 获取所有的科室
    request.get('https://doctor.mdslife.com/api/v1/departments')
      .then((data) => {
        this.setState({
          dataSource: ds.cloneWithRows(data.departments),
          data: data.departments
        })
      })
    // 获取每个的科室下面的分类
    request.get('https://doctor.mdslife.com/api/v1/departments?department=1')
      .then((data) => {
        this.setState({
          dataSourceRight: this.state.dataSourceRight.cloneWithRows(data.departments)
        })
      })
  }
  click (id, rowId) {
    request.get(`https://doctor.mdslife.com/api/v1/departments?department=${id}`)
      .then((data) => {
        this.setState({
          showIndex: rowId,
          dataSource: ds.cloneWithRows(this.state.data),
          dataSourceRight: this.state.dataSourceRight.cloneWithRows(data.departments)
        })
      })
  }
  clickRight (rowData) {
    this.props.setProfession(rowData.name, rowData.id)
  }
  _render (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={this.click.bind(this, rowData.id, rowId)}>
        <View style={styles.listLeftBottom}>
          <Text style={this.state.showIndex === rowId ? styles.listRight : styles.list}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderRight (rowData) {
    return (
      <TouchableOpacity onPress={this.clickRight.bind(this, rowData)}>
        <Text style={styles.listRight}>{rowData.name}</Text>
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

export default Selectprofession
