// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  ListView
} from 'react-native'

import request from '../Services/request'
// Styles
import styles from './Styles/SelectHospitalStyle'
class SelectHospital extends React.Component {
  constructor (props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.data[0]),
      proHospitalData: '', // 省下面的所有医院
      cityData: props.data[0],
      proId: props.data[3],
      cityActive: false
    }
  }

  componentDidMount () {
    // 获取对应省下面的所有医院
    request.get(`https://doctor.mdslife.com/api/v1/hospitals?region=${this.state.proId}`)
      .then((data) => {
        this.setState({
          proHospitalData: data.hospitals
        })
      })
  }
  setHospital (rowData) {
    this.props.setHospital(rowData.name, rowData.id)
  }
  _render (rowData) {
    return (
      <View style={styles.item}>
        <Text
          style={styles.itemText}
          onPress={this.setHospital.bind(this, rowData)}
        >{rowData.name}</Text>
      </View>
    )
  }
  proClick () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.proHospitalData),
      cityActive: true
    })
  }
  cityClick () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.cityData),
      cityActive: false
    })
  }
  render () {
    let pro = this.props.data[1]
    let city = this.props.data[2]
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
            style={this.state.cityActive === false ? styles.itemText : styles.itemTextActive}
            onPress={this.proClick.bind(this)}
          >{pro}</Text>
        </View>
        <View style={styles.item}>
          <Text
            style={this.state.cityActive === true ? styles.itemText : styles.itemTextActive}
            onPress={this.cityClick.bind(this)}
          >{city}</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._render.bind(this)}
          automaticallyAdjustContentInsets
          showsVerticalScrollIndicator={false}
          enableEmptySections
        />
      </View>
    )
  }

}

export default SelectHospital
