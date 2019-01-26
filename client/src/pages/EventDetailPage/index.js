import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getEvent } from '../../actions/event'

import './index.scss'

@connect(({ event }) => ({
  currentEvent: event.currentEvent
}), (dispatch) => ({
  getEvent(eventid) {
    dispatch(getEvent(eventid))
  }
}))
class EventDetailPage extends Component {
  config = {
    navigationBarTitleText: '活动',
  }

  componentDidMount() {
    const { id } = this.$router.params;
    this.props.getEvent(id);
  }

  render () {
    const { title } = this.props.currentEvent;
    return (
      <View className='eventDetailPage'>
        <View>{title}</View>
        <View></View>
        <View></View>
      </View>
    )
  }
}

export default EventDetailPage
