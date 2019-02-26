import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import ActivityCard from '../../components/ActivityCard'
import Carousel from '../../components/Carousel';
import LoadingIndicator from '../../components/LoadingIndicator'
import { getInitialEvents, getPaginatedEvents, deleteEvent } from "../../actions/event";
import { getInitialWorkshops, getPaginatedWorkshops, deleteWorkshop } from "../../actions/workshop";
import { setCurrentCategory } from '../../actions/category';
import getEventsUnderCategory from '../../selectors/events_under_category';
import getWorkshopsUnderCategory from '../../selectors/workshops_under_category';
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ event, workshop, loading }) => ({
  allEvents: getEventsUnderCategory(event),
  eventCategories: event.eventCategories,
  currentEventCategory: event.currentEventCategory,
  allWorkshops: getWorkshopsUnderCategory(workshop),
  workshopCategories: workshop.workshopCategories,
  currentWorkshopCategory: workshop.currentWorkshopCategory,
  isFetching: createLoadingSelector(['GET_INITIAL_EVENTS', 'GET_PAGINATED_EVENTS', 'GET_INITIAL_WORKSHOPS', 'GET_PAGINATED_WORKSHOPS', 'EDIT_WORKSHOP_CATEGORY', 'DELETE_EVENT', 'DELETE_WORKSHOP'])(loading),
}), (dispatch) => ({
  getInitialEvents: () => dispatch(getInitialEvents()),
  getPaginatedEvents: (options) => dispatch(getPaginatedEvents(options)),
  deleteEvent: (eventid) => dispatch(deleteEvent(eventid)),
  getInitialWorkshops: () => dispatch(getInitialWorkshops()),
  getPaginatedWorkshops: (options) => dispatch(getPaginatedWorkshops(options)),
  deleteWorkshop: (workshopid) => dispatch(deleteWorkshop(workshopid)),
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
}))
class ManageActivityPage extends Component {
  config = {
    navigationBarTitleText: 'Admin Activity'
  }

  state = {
    startIndex: 3,
    editing: false,
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

  onReachBottom = async() => {
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

  _manageActivity = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  _goAddActivityPage = () => {
    const { type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/CreateUpdateActivityPage/index?type=${type}`
    })
  }

  _goAddCategoryPage = () => {
    const { type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/CreateUpdateCategoryPage/index?type=${type}`
    })
  }

  _handleChangeCategory = (category) => {
    this.props.setCurrentCategory(category);
  }

  _editCategory = (categoryid) => {
    const { type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/CreateUpdateCategoryPage/index?type=${type}&id=${categoryid}`
    })
  }

  _handleClickActivity = (activityid) => {
    const { type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/ActivityDetailPage/index?type=${type}&id=${activityid}`
    })
  }

  _editActivity = (activityid) => {
    const { type } = this.$router.params;
    Taro.navigateTo({
      url: `/pages/CreateUpdateActivityPage/index?type=${type}&id=${activityid}`
    })
  }

  _deleteActivity = (activityid) => {
    if (this.props.isFetching) return;
    const { type } = this.$router.params;
    if (type === 'event') this.props.deleteEvent(activityid);
    if (type === 'workshop') this.props.deleteWorkshop(activityid);
  }

  render () {
    const { type } = this.$router.params;
    if (!type) return null;
    const { allEvents, eventCategories, currentEventCategory, allWorkshops, workshopCategories, currentWorkshopCategory, isFetching } = this.props;
    const { editing } = this.state;
    let activities, categories, currentCategory;
    if (type === 'event') {
      activities = allEvents;
      categories = eventCategories;
      currentCategory = currentEventCategory;
    }
    if (type === 'workshop') {
      activities = allWorkshops;
      categories = workshopCategories;
      currentCategory = currentWorkshopCategory;
    }

    return (
      <View className='manageActivityPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
        <View className='manageActivityPage-btnGroup'>
          <AtButton onClick={this._manageActivity} type='primary'>
            {editing ? 'Done' : `Manage ${type}`}
          </AtButton>
          { editing &&
            <View>
              <AtButton onClick={this._goAddActivityPage}>Add {type}</AtButton>
              <AtButton onClick={this._goAddCategoryPage}>Add Category</AtButton>
            </View>
          }
        </View>
        <View className='admin-carousel'>
          <Carousel
            categories={categories}
            onSwiperChange={this._handleChangeCategory}
            onClickItem={this._editCategory}
          />
          <View className='category-text-section'>
            <View className='category-name'>{(currentCategory || {}).name}</View>
            <View className='category-desc'>{(currentCategory || {}).desc}</View>
          </View>
        </View>
        <View className='admin-activitylist'>
          {
            activities.map(activity => (
              <View key={activity._id} className='admin-activity'>
                <View className='admin-activity-card'>
                  <ActivityCard
                    activity={activity}
                    onClick={this._handleClickActivity.bind(this, activity._id)}
                  />
                </View>
                {
                  editing &&
                  <View className='admin-btn-group'>
                    <View
                      className='at-icon at-icon-edit edit-icon'
                      onClick={this._editActivity.bind(this, activity._id)}
                    />
                    <View
                      className='at-icon at-icon-trash delete-icon'
                      onClick={this._deleteActivity.bind(this, activity._id)}
                    />
                  </View>
                }
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default ManageActivityPage
