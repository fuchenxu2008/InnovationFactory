import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import EventCard from '../../components/EventCard'
import { getAllEvents } from "../../actions/event";

import './index.scss'

@connect(({ event }) => ({
  allEvents: event.allEvents,
}), (dispatch) => ({
  getAllEvents() {
    dispatch(getAllEvents())
  }
}))
class LatestEventPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#64388A'
  }

  componentDidMount() {
    this.props.getAllEvents()
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
         
        </View>
      </View>
    )
  }
}

export default LatestEventPage
