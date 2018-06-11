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
import StudentRegisterActions from '../Redux/StudentRegisterRedux'
// Styles
import styles from './Styles/SelectSchoolStyle'

class SelectSchool extends React.Component {

  componentDidMount () {
    // 获取对应省下面的所有学校
    this.props.schoolData()
  }

  click (name, id,rowId) {
    this.props.studentSetData('schoolShowIndex',rowId)
    this.props.schoolClick(name, id)
  }
  _render (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={()=>this.click(rowData.name, rowData.id, rowId)}>
        <View style={styles.listLeftBottom}>
          <Text style={this.props.state.schoolShowIndex == rowId ? styles.listRight : styles.list}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const {
      proName,
      areaName,
      schoolData
    }= this.props.state
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const ListViewData = ds.cloneWithRows(schoolData)

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
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    state: state.studentRegister
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  studentSetData: (key,value) => dispatch(StudentRegisterActions.studentSetData(key,value)),
  schoolData: () => dispatch(StudentRegisterActions.schoolData()),
  schoolClick: (name,id) => dispatch(StudentRegisterActions.schoolClick(name,id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectSchool)
