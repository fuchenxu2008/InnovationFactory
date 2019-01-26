import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import GradientHeader from '../../components/GradientHeader'
import { connect } from '@tarojs/redux'
import { getEvent } from '../../actions/event'
import { ROOT_URL } from '../../config'

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
    const { title, albumPicPath, desc, startTime, endTime, address } = this.props.currentEvent;
    return (
      <View className='eventDetailPage'>
        <GradientHeader pageTitle='创新探索' />
        <View className='eventDetailPage-detailcard'>
          <Image src={`${ROOT_URL}${albumPicPath}`} className='eventDetailPage-detailcard-img' mode='aspectFill' />
          <View className='eventDetailPage-detailcard-content'>
            <View className='eventDetailPage-detailcard-title'>
              <View className='gradient-stick' />
              <View>{title}</View>
            </View>
            <View className='eventDetailPage-detailcard-timeplace'>
              <View>{`${startTime}-${endTime}`}</View>
              <View>{address}</View>
            </View>
            <View className='eventDetailPage-detailcard-desc'>{desc}</View>
            <View className='eventDetailPage-detailcard-btnGroup'>
              <View className='at-icon at-icon-link' />
              <View className='signup-btn'>报名</View>
              <View className='at-icon at-icon-share'></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default EventDetailPage
