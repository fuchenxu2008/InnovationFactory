import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import EventCard from '../../components/EventCard'
import BookmarkIcon from '../../components/BookmarkIcon'
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
  }

  componentDidMount() {
    this.props.getAllEvents()
  }

  render () {
    return (
      <View className='latestEventPage'>
        <View className='latestEventPage-header'>
          <View className='latestEventPage-gradientheader'>
            <View className='latestEventPage-bookmarkicon'>
              <BookmarkIcon />
            </View>
            <View className='page-title'>The latest events</View>
            <View style={{ transform: 'translateY(110rpx)' }}>
              <Carousel />
            </View>
          </View>       
        </View>
        <View>
          <View className='latestEventPage-eventlist-heading'>
            <View className='latestEventPage-eventlist-title'>活动列表</View>
          </View>
          <ScrollView scrollX scrollWithAnimation>
            <View className='latestEventPage-eventlist'>
              {
                this.props.allEvents.map(event => (
                  <View key={event._id} className='latestEventPage-eventlistitem'>
                    <EventCard event={event} />
                  </View>
                ))
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default LatestEventPage
