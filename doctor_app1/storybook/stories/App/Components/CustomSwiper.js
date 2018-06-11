// @flow

import React from 'react'
import { View, Image } from 'react-native'
import styles from './Styles/CustomSwiperStyle'

import { Metrics } from '../Themes'

import Swiper from 'react-native-swiper'

const Slide = props => {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={{uri: props.uri}} />
    </View>
  )
}

export default class CustomSwiper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imgList: [
        'https://doctor.mdslife.com/assets/doctorlp5-0f12d85b21d0454fc866f817cc7fdce342c4f787834d6f3aee4d7a061b07bef6.png',
        'https://doctor.mdslife.com/assets/doctorlp4-c2aa91b02a4574edbd17e873ed771cf8e8403dec428b8afae3b30ab205ec5949.png',
        'https://doctor.mdslife.com/assets/doctorlp2-24150c978e62924b915111090b68377947b95dd21c14c5d4fa64620803858cdf.jpg',
        'https://doctor.mdslife.com/assets/doctorlp3-37afbcb30a35e4e1c2caca263e44de40ff44bfbace7b0330561ec352e37d2b4d.png',
        'https://doctor.mdslife.com/assets/doctorlp1-22e4ec248bdacb09fd5c65ae0b7d2457b16c0d0297f1fd5a93f07ad242975580.jpg'
      ]
    }
  }

  render () {
    const height = Metrics.screenWidth * 350 / 750

    return (
      <View style={styles.container}>
        <Swiper
          paginationStyle={{
            bottom: 5
          }}
          autoplay
          height={height}
          loop
          >
          {
            this.state.imgList.map((item, i) => <Slide
              uri={item}
              key={i} />)
          }
        </Swiper>
    </View>
    )
  }
}

// // Prop type warnings
// CustomSwiper.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// CustomSwiper.defaultProps = {
//   someSetting: false
// }
