import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import ActivityCard from '../../components/ActivityCard'
import GradientHeader from '../../components/GradientHeader'
import { getAllEvents } from "../../actions/event";
import { getAllWorkshops } from "../../actions/workshop";

import './index.scss'

@connect(({ event, workshop }) => ({
  allEvents: event.allEvents,
  allWorkshops: workshop.allWorkshops,
}), (dispatch) => ({
  getAllEvents: () => dispatch(getAllEvents()),
  getAllWorkshops: () => dispatch(getAllWorkshops())
}))
class LatestActivityPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
  }

  componentDidMount() { 
    const { type } = this.$router.params;
    if (type === 'event') this.props.getAllEvents();
    if (type === 'workshop') this.props.getAllWorkshops();
  }

  _handleClickActivity = (activityid) => {
    const { type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/ActivityDetailPage/index?type=${type}&id=${activityid}`
    })
  }

  render () {
    const { type } = this.$router.params;
    let allActivities = [];
    if (type === 'event') allActivities = this.props.allEvents;
    if (type === 'workshop') allActivities = this.props.allWorkshops;

    return (
      <View className='latestActivityPage'>
        <GradientHeader pageTitle={`The latest ${type}`} />
        <View className='latestActivityPage-carousel'>
          <Carousel />
        </View>
        <View>
          <View className='latestActivityPage-activitylist-heading'>
            <View className='latestActivityPage-activitylist-title'>活动列表</View>
          </View>
          <ScrollView scrollX scrollWithAnimation>
            <View className='latestActivityPage-activitylist'>
              {
                allActivities.map(activity => (
                  <View key={activity._id} className='latestActivityPage-activitylistitem'>
                    <ActivityCard
                      activity={activity}
                      onClick={this._handleClickActivity.bind(this, activity._id)}
                    />
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

export default LatestActivityPage
