import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import GradientHeader from '../../components/GradientHeader'
import { getEvent } from '../../actions/event'
import { ROOT_URL } from '../../config'

import './index.scss'

@connect(({ event }) => ({
  currentEvent: event.currentEvent
}), (dispatch) => ({
  getEvent: (eventid) => dispatch(getEvent(eventid))
}))
class EventDetailPage extends Component {
  config = {
    navigationBarTitleText: '活动',
  }

  componentDidMount() {
    const { id } = this.$router.params;
    if (id) this.props.getEvent(id);
  }

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    const { id } = this.$router.params;
    const { title } = this.props.currentEvent;
    return {
      title: `New Event: ${title}`,
      path: `/pages/EventDetailPage/index?id=${id}`,
    }
  }

  _handleEnterSignUp = () => {
    const { id } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/SignUpPage/index?type=event&id=${id}`
    })
  }

  render () {
    if (!this.props.currentEvent) return null;
    const { title, subtitle, albumPicPath, desc, startTime, address } = this.props.currentEvent;
    return (
      <View className='eventDetailPage'>
        <GradientHeader pageTitle='创新探索' />
        <View className='eventDetailPage-detailcard'>
          <Image src={`${ROOT_URL}${albumPicPath}`} className='eventDetailPage-detailcard-img' mode='aspectFill' />
          <View className='eventDetailPage-detailcard-content'>
            <View className='eventDetailPage-detailcard-titlesection'>
              <View className='gradient-stick-section'>
                <View className='gradient-stick' />
              </View>
              <View>
                <View className='detailcard-title'>{title}</View>
                <View className='detailcard-subtitle'>{subtitle}</View>
              </View>
            </View>
            <View className='eventDetailPage-detailcard-timeplace'>
              <View className='detailcard-time'>
                <View className='at-icon at-icon-clock detailcard-info-heading'>
                  <Text>Time: </Text>
                </View>
                <View className='detailcard-info-value'>{startTime}</View>
              </View>
              <View className='detailcard-address'>
                <View className='at-icon at-icon-map-pin detailcard-info-heading'>
                  <Text>Location: </Text>
                </View>
                <View className='detailcard-info-value'>{address}</View>
              </View>
            </View>
            <View className='eventDetailPage-detailcard-desc'>{desc}</View>
            <View className='eventDetailPage-detailcard-btnGroup'>
              <View className='at-icon at-icon-link' />
              <View className='signup-btn' onClick={this._handleEnterSignUp}>报名</View>
              <Button openType='share' plain='true'>
                <View className='at-icon at-icon-share' />
              </Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default EventDetailPage
