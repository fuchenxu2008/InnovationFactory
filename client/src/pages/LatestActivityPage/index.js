import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import ActivityCard from '../../components/ActivityCard'
import GradientHeader from '../../components/GradientHeader'
import LoadingIndicator from '../../components/LoadingIndicator'
// import PopUpModal from '../../components/PopUpModal'
import { getInitialEvents, getPaginatedEvents } from "../../actions/event";
import { getInitialWorkshops, getPaginatedWorkshops } from "../../actions/workshop";
import { setCurrentCategory } from '../../actions/category';
import getEventsUnderCategory from '../../selectors/events_under_category';
import getWorkshopsUnderCategory from '../../selectors/workshops_under_category';
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ event, workshop, loading }) => ({
  allEvents: getEventsUnderCategory(event),
  allWorkshops: getWorkshopsUnderCategory(workshop),
  eventCategories: event.eventCategories,
  currentEventCategory: event.currentEventCategory,
  workshopCategories: workshop.workshopCategories,
  currentWorkshopCategory: workshop.currentWorkshopCategory,
  isFetching: createLoadingSelector(['GET_INITIAL_EVENTS', 'GET_PAGINATED_EVENTS', 'GET_INITIAL_WORKSHOPS', 'GET_PAGINATED_WORKSHOPS'])(loading),
}), (dispatch) => ({
  getInitialEvents: () => dispatch(getInitialEvents()),
  getPaginatedEvents: (options) => dispatch(getPaginatedEvents(options)),
  getInitialWorkshops: () => dispatch(getInitialWorkshops()),
  getPaginatedWorkshops: (options) => dispatch(getPaginatedWorkshops(options)),
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
}))
class LatestActivityPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
  }

  state = {
    startIndex: 3,
    // showModal: true,
  }

  componentDidMount() {
    const { type } = this.$router.params;
    if (type === 'event') this.props.getInitialEvents();
    if (type === 'workshop') this.props.getInitialWorkshops();
  }

  componentWillReceiveProps(nextProps) {
    const { type } = this.$router.params;
    let startIndex;
    if (type === 'event') startIndex = nextProps.allEvents.length;
    if (type === 'workshop') startIndex = nextProps.allWorkshops.length;
    this.setState({ startIndex });
  }

  _handlePaginationLoad = async() => {
    if (this.props.isFetching) return;
    const { type } = this.$router.params;
    if (type === 'event') await this.props.getPaginatedEvents({
      start: this.state.startIndex,
      category: (this.props.currentEventCategory || {})._id,
    });
    if (type === 'workshop') await this.props.getPaginatedWorkshops({
      start: this.state.startIndex,
      category: (this.props.currentWorkshopCategory || {})._id,
    });
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

  // _handleCloseModal = () => this.setState({ showModal: false })

  render () {
    const { type } = this.$router.params;
    const { allEvents, eventCategories, allWorkshops, workshopCategories, isFetching } = this.props;

    let allActivities = [];
    let allCategories = [];
    if (type === 'event') {
      allActivities = allEvents;
      allCategories = eventCategories;
    }
    if (type === 'workshop') {
      allActivities = allWorkshops;
      allCategories = workshopCategories;
    }

    return (
      <View className='latestActivityPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
        {
          // this.state.showModal &&
          // <PopUpModal onClose={this._handleCloseModal} />
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
          <ScrollView scrollX onScrollToLower={this._handlePaginationLoad} lowerThreshold={1}>
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
