import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, ScrollView } from '@tarojs/components'
import Carousel from '../../components/Carousel'
import EventCard from '../../components/EventCard'

import './index.scss'

class LatestEventPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
    // navigationBarBackgroundColor: '#64388A'
  }

  render () {
    return (
      <View className='latestEventPage'>
        <View className='latestEventPage-header'>
          <View className='latestEventPage-gradientheader'>
            <View className='page-title'>The latest events 最新活动</View>
            <View style={{ transform: 'translateY(110rpx)' }}>
              <Carousel />
            </View>
          </View>       
        </View>
        <View>
          <View className='latestEventPage-eventlist-title'>活动列表</View>
          <ScrollView scrollX scrollWithAnimation>
            <View className='latestEventPage-eventlist'>
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default LatestEventPage
