import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import EventCard from '../../components/EventCard'
import GradientHeader from '../../components/GradientHeader'
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
        <GradientHeader pageTitle='The latest events' />
        <View className='latestEventPage-carousel'>
          <Carousel />
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
