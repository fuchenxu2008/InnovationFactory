import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import dayjs from 'dayjs'
import GradientHeader from '../../components/GradientHeader'
import LoadingIndicator from '../../components/LoadingIndicator'
import { getEvent } from '../../actions/event'
import { getWorkshop } from '../../actions/workshop'
import createLoadingSelector from '../../selectors/loadingSelector'
import { ROOT_URL } from '../../config'
import checkLogin from '../../utils/checkLogin'

import './index.scss'

@connect(({ global, event, workshop, loading }) => ({
  currentUser: global.currentUser,
  currentEvent: event.currentEvent,
  currentWorkshop: workshop.currentWorkshop,
  isFetching: createLoadingSelector(['GET_EVENT', 'GET_WORKSHOP'])(loading),
}), (dispatch) => ({
  getEvent: (eventid) => dispatch(getEvent(eventid)),
  getWorkshop: (workshopid) => dispatch(getWorkshop(workshopid))
}))
class ActivityDetailPage extends Component {
  config = {
    navigationBarTitleText: '活动',
  }

  componentDidMount() {
    const { id, type } = this.$router.params;
    if (id) {
      if (type === 'event') this.props.getEvent(id);
      if (type === 'workshop') this.props.getWorkshop(id);
    }
  }

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    const { id, type } = this.$router.params;
    let currentActivity;
    if (type === 'event') currentActivity = this.props.currentEvent || {};
    if (type === 'workshop') currentActivity = this.props.currentWorkshop || {};
    if (!currentActivity) return;
    const { title } = currentActivity;
    return {
      title: `New Event: ${title}`,
      path: `/pages/ActivityDetailPage/index?type=${type}&id=${id}`,
    }
  }

  _handleEnterWeb = (link) => {
    Taro.navigateTo({
      url: `/pages/WebViewPage/index?link=${link}`
    })
  }

  _handleEnterSignUp = () => {
    if (!checkLogin(this.props.currentUser)) return;
    const { id, type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/SignUpPage/index?type=${type}&id=${id}`
    });
  }

  render () {
    const { type } = this.$router.params;
    const { currentEvent, currentWorkshop, isFetching } = this.props;

    let currentActivity;
    if (type === 'event') currentActivity = currentEvent;
    if (type === 'workshop') currentActivity = currentWorkshop;
    if (!currentActivity) return null;
    const {
      title,
      subtitle,
      albumPicPath,
      desc,
      startTime,
      signupTo,
      address,
      linkToArticle,
      acceptSignup,
    } = currentActivity;

    return (
      <View className='activityDetailPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
        <GradientHeader pageTitle='创新探索' />
        <View className='activityDetailPage-detailcard'>
          <Image src={`${ROOT_URL}${albumPicPath}`} className='activityDetailPage-detailcard-img' mode='aspectFill' />
          <View className='activityDetailPage-detailcard-content'>
            <View className='activityDetailPage-detailcard-titlesection'>
              <View className='gradient-stick-section'>
                <View className='gradient-stick' />
              </View>
              <View>
                <View className='detailcard-title'>{title}</View>
                <View className='detailcard-subtitle'>{subtitle}</View>
              </View>
            </View>
            <View className='activityDetailPage-detailcard-timeplace'>
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
            <View className='activityDetailPage-detailcard-desc'>{desc}</View>
            <View className='activityDetailPage-detailcard-btnGroup'>
              {
                linkToArticle &&
                <View className='at-icon at-icon-link' onClick={() => this._handleEnterWeb(linkToArticle)} />
              }
              {
                acceptSignup && !(dayjs().isAfter(dayjs(signupTo)) || dayjs().isAfter(dayjs(startTime))) &&
                <View className='signup-btn' onClick={this._handleEnterSignUp}>报名</View>
              }
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

export default ActivityDetailPage
