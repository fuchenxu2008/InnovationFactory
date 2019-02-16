import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import ActivityCard from '../../components/ActivityCard'
import GradientHeader from '../../components/GradientHeader'
import PopUpModal from '../../components/PopUpModal'
import { getInitialEvents } from "../../actions/event";
import { getAllWorkshops } from "../../actions/workshop";
import { setCurrentCategory } from '../../actions/category';
import getEventsUnderCategory from '../../selectors/events_under_category';
import getWorkshopsUnderCategory from '../../selectors/workshops_under_category';

import './index.scss'

@connect(({ event, workshop }) => ({
  allEvents: getEventsUnderCategory(event),
  allWorkshops: getWorkshopsUnderCategory(workshop),
  eventCategories: event.eventCategories,
  workshopCategories: workshop.workshopCategories,
}), (dispatch) => ({
  getInitialEvents: () => dispatch(getInitialEvents()),
  getAllWorkshops: () => dispatch(getAllWorkshops()),
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
}))
class LatestActivityPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
  }

  componentDidMount() { 
    const { type } = this.$router.params;
    if (type === 'event') this.props.getInitialEvents();
    if (type === 'workshop') this.props.getAllWorkshops();
  }

  _handleChangeCategory = (category) => {
    this.props.setCurrentCategory(category)
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
    let allCategories = [];
    if (type === 'event') {
      allActivities = this.props.allEvents;
      allCategories = this.props.eventCategories;
    }
    if (type === 'workshop') {
      allActivities = this.props.allWorkshops;
      allCategories = this.props.workshopCategories;
    }

    return (
      <View className='latestActivityPage'>
        {
          // <PopUpModal />
        }
        <GradientHeader pageTitle={`The latest ${type}`} />
        <View className='latestActivityPage-carousel'>
          <Carousel
            categories={allCategories}
            onSwiperChange={this._handleChangeCategory}
          />
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
