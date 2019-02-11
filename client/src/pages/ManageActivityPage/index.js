import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import ActivityCard from '../../components/ActivityCard'
import { getAllEvents, deleteEvent } from "../../actions/event";
import { getAllWorkshops, deleteWorkshop } from "../../actions/workshop";

import './index.scss'

@connect(({ event, workshop }) => ({
  allEvents: event.allEvents,
  allWorkshops: workshop.allWorkshops,
}), (dispatch) => ({
  getAllEvents: () => dispatch(getAllEvents()),
  deleteEvent: (eventid) => dispatch(deleteEvent(eventid)),
  getAllWorkshops: () => dispatch(getAllWorkshops()),
  deleteWorkshop: (workshopid) => dispatch(deleteWorkshop(workshopid)),
}))
class ManageActivityPage extends Component {
  config = {
    navigationBarTitleText: 'Admin Activity'
  }

  state = {
    editing: false,
  }

  componentDidMount() {
    const { type } = this.$router.params;
    if (type === 'event') this.props.getAllEvents();
    if (type === 'workshop') this.props.getAllWorkshops();
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
    const { type } = this.$router.params;
    if (type === 'event') this.props.deleteEvent(activityid);
    if (type === 'workshop') this.props.deleteWorkshop(activityid);
  }

  render () {
    const { type } = this.$router.params;
    if (!type) return null;
    const { editing } = this.state;
    let activities = [];
    if (type === 'event') activities = this.props.allEvents;
    if (type === 'workshop') activities = this.props.allWorkshops;

    return (
      <View className='manageActivityPage'>
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
