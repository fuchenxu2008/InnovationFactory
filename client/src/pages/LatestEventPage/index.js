import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import Carousel from '../../components/Carousel'

import './index.scss'

class LatestEventPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
    // navigationBarBackgroundColor: '#64388A'
  }

  render () {
    return (
      <View className='latestEventPage'>
        <View className='latestEventPage-gradientheader'>
            <View className='page-title'>THE LATEST EVENTS</View>
            <Carousel />
        </View>
      </View>
    )
  }
}

export default LatestEventPage
