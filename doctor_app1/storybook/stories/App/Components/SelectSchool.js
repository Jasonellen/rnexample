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
import styles from './Styles/SelectSchoolStyle'

class SelectSchool extends React.Component {
  constructor (props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds,
      cityName: props.cityName,
      schoolIndex: props.schoolIndex
    }
  }

  componentDidMount () {
    request.get(`https://doctor.mdslife.com/api/v1/schools?address=${this.state.cityName}`)
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.schools)
        })
      })
  }

  click (rowData, rowId) {
    this.props.setSchool(rowData.name, rowId, rowData.id)
  }
  _render (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={this.click.bind(this, rowData, rowId)}>
        <View style={styles.listLeftBottom}>
          <Text style={this.state.schoolIndex === rowId ? styles.listRight : styles.list}>{rowData.name}</Text>
        </View>
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
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default SelectSchool
