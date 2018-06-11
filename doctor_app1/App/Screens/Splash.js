// @flow

import React, { PropTypes } from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// external libs
import IndexWebview from './IndexWebview'
// Styles
import styles from './Styles/SplashStyle'
import JsConfig from '../Config/JsConfig';
import  Storage  from '../Lib/Storage';

import {Actions} from "react-native-router-flux";

const splashImg = Images.background;

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.bounceValue, { toValue: 1.2, duration: 1000 }
    ).start();
    this.timer = setTimeout(() => {
      Storage.get('lastUrl').then((url)=>{
        let lastUrl=url || JsConfig.API_HOST + '/login';

        Actions.indexWebview({
          lastUrl: lastUrl,
          type: 'replace'
        })
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={[styles.splashContainer, {transform: [{ scale: this.state.bounceValue }]} ]}
        source={splashImg}
      />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
