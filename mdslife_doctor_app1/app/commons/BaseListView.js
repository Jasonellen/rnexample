import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  RefreshControl,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  StatusBar,
  Image,
  RecyclerViewBackedScrollView,
} from 'react-native'


import {Images, Colors, Metrics} from '../Themes'

class BaseListView extends Component {

  // ------------ init -------------

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    const {data = [], search} =  this.props;

    this.state = {
      isRefreshing: false,
      ds,
      dataSource: ds.cloneWithRowsAndSections(data)
    }
  }

  // ------------ logic  ---------------

  updateList(props) {
    //TODO: 比对prev和next，search的筛选
    const {data = [], search} = props || this.props;
    this.setState({
      dataSource: this.state.ds.cloneWithRowsAndSections(data)
    })
  }

  // ------------ lifecycle ------------

  componentDidMount() {
    // this.updateList()
  }

  componentWillReceiveProps(nextProps) {
    this.updateList(nextProps)
  }

  componentDidUpdate() {
    const {autoScroll} = this.props

    if (autoScroll && "listHeight" in this.state &&
      "footerY" in this.state &&
      this.state.footerY > this.state.listHeight) {
      let scrollDistance = this.state.listHeight - this.state.footerY;
      this.refs.list.getScrollResponder().scrollTo({y: -scrollDistance, animated: true});
    }
  }

  // ------------ handlers -------------

  handleRefresh() {
    const {handleRefresh} = this.props;
    this.setState({isRefreshing: true})
    handleRefresh()
    // TODO: 刷新成功/刷新失败
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  }

  // ------------ renders -------------

  _renderRow(rowData, sectionId, rowID, highlightRow) {

    return (
      <TouchableOpacity onPress={() => {
        {/*NavigationActions.contactInfo({"uid": rowData})*/
        }
      }}>
        <View style={Styles.row}>
          <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
          <View style={Styles.rowName}>
            <Text>{rowData}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={Styles.separator}
      />
    )
  }


  render() {
    const {hasNav, renderRow, renderSeparator, listViewStyle, autoScroll = false, renderHeader,isRefreshControl,removeClippedSubviews} = this.props

    const containerStyle = [Styles.container]
    // hasNav && containerStyle.push({marginTop: Metrics.navBarHeight})
    const listStyle = [Styles.listView]
    listViewStyle && listStyle.push(listViewStyle)

    return (
      <View style={containerStyle}>
        <ListView
          ref="list"
          refreshControl={
              isRefreshControl ?
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh.bind(this)}
            //  tintColor="#ff0000"
              title="Loading..."
              titleColor="#B1B1B1"
              colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
              progressBackgroundColor="#ffffff"
            /> : null
          }
          automaticallyAdjustContentInsets={false}
          initialListSize={10}
          removeClippedSubviews={removeClippedSubviews}
          enableEmptySections={true}
          style={listStyle}
          dataSource={this.state.dataSource}
          renderRow={renderRow || this._renderRow.bind(this)}
          renderSeparator={renderSeparator || this._renderSeparator.bind(this)}
          //renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          onLayout={(event) => {
            this.setState({
              listHeight: event.nativeEvent.layout.height
            })
          }}
          renderHeader={renderHeader}
          renderFooter={() => {
            return (<View onLayout={(event) => {
              this.setState({
                footerY: event.nativeEvent.layout.y
              })
            }}/>)
          }}
        />
      </View>
    )
  }
}


BaseListView.propTypes = {
  hasNav: PropTypes.bool,
  data: PropTypes.object,
  search: PropTypes.string,
  handleRefresh: PropTypes.func,
  renderRow: PropTypes.func,
  renderSeparator: PropTypes.func,
    isRefreshControl:PropTypes.bool,
    removeClippedSubviews: PropTypes.bool
}
BaseListView.defaultProps = {
    isRefreshControl: true,
    removeClippedSubviews:true
};
export default BaseListView

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Metrics.navBarHeight,
    },
    // 头
    // header: {
    //   // flex: 1,
    //   height: 44,
    //   paddingHorizontal: 10,
    //   paddingVertical: 5,
    //   flexDirection: 'row',
    //   backgroundColor: Colors.bgGrey,
    //   borderBottomWidth: StyleSheet.hairlineWidth,
    //   borderBottomColor: Colors.paleGrey
    // },
    // search: {
    //   flex: 1,
    //   borderRadius: 3,
    //   flexDirection: 'row',
    // },
    // searchRow: {
    //   // color: Colors.blueyGrey,
    //   flex: 1,
    //   width: 100,
    //   height: 30,
    //   justifyContent: 'center',
    //   alignItems: 'flex-start',
    //   backgroundColor: Colors.paleGrey,
    // },
    // searchInput: {
    //   height: 30,
    //   fontSize: 13,
    //   paddingLeft: 4
    // },
    // searchIcon: {
    //   alignItems: 'flex-end',
    //   justifyContent: 'center',
    // },
    // searchFocus: {
    //   flex: 0,
    //   width: 20,
    //   alignItems: 'center'
    // },
    // searchCancel: {
    //   width: 50,
    //   height: 30,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // placeholderTextColor: Colors.blueyGrey,
    // // selectionColor: '#fff',
    // searchPlus: {
    //   width: 30,
    //   height: 30,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // ListView
    listView: {
        flex: 1,
    },
    row: {
        marginHorizontal: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        marginHorizontal: 15,
        backgroundColor: '#CCCCCC',
    },
    rowLogo: {
        marginTop: 10,
        width: 30,
        height: 30,
        borderRadius: 15
    },
    rowName: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5
    },
    groupHeader: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCCCCC',
    },
    groupHeaderTextWrapper: {
        paddingLeft: 15,
        justifyContent: 'center',
    },
    groupHeaderText: {
        fontSize: 15,
    },
    groupHeaderIcon: {
        flex: 1,
        paddingRight: 16,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    noticeHeaderWrapper: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(64, 94, 122, 1)',
    },
    noticeHeaderText: {
        color: 'white',
        textAlign: 'left',
    },
    noticeHeaderLeft: {
        width: 45,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    noticeHeaderRight: {
        flex: 1,
        justifyContent: 'center',
    },
    noticeHeaderMiddle: {
        flex: 1,
        justifyContent: 'center',
    },
    noticeHeaderTextRight: {
        textAlign: 'right',
        paddingRight: 15
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    accept: {
        height: 40,
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#08ba6e',
        marginRight: 5,
    },
    decline: {
        height: 40,
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#8798a4',
    },
});


