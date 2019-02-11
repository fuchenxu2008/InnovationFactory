import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addEvent, updateEvent, getEvent } from '../../actions/event'
import { addWorkshop, updateWorkshop, getWorkshop } from '../../actions/workshop'
import AdminActivityForm from '../../components/AdminActivityForm'

import './index.scss'

@connect(({ event, workshop }) => ({
  currentEvent: event.currentEvent,
  currentWorkshop: workshop.currentWorkshop,
}), (dispatch) => ({
  addEvent: (event) => dispatch(addEvent(event)),
  updateEvent: (edition) => dispatch(updateEvent(edition)),
  getEvent: (eventid) => dispatch(getEvent(eventid)),
  addWorkshop: (workshop) => dispatch(addWorkshop(workshop)),
  updateWorkshop: (edition) => dispatch(updateWorkshop(edition)),
  getWorkshop: (workshopid) => dispatch(getWorkshop(workshopid)),
}))
class CreateUpdateActivityPage extends Component {
  config = {
    navigationBarTitleText: `Add ${this.$router.params.type}`
  }

  componentDidMount() {
    const { id, type } = this.$router.params;
    if (id) {
      if (type === 'event') this.props.getEvent(id);
      if (type === 'workshop') this.props.getWorkshop(id);
    }
  }

  _handleReceiveActivity = async(activity) => {
    const { id, type } = this.$router.params;
    if (type === 'event') {
      id ? await this.props.updateEvent({ id, event: activity })
        : await this.props.addEvent(activity)
    }
    if (type === 'workshop') {
      id ? await this.props.updateWorkshop({ id, workshop: activity })
        : await this.props.addWorkshop(activity)
    }
    Taro.navigateBack();
  }

  render () {
    // If id exist, then it's editing workshop; else would be creating new workshop
    const { id, type } = this.$router.params;
    let currentActivity;
    if (type === 'event') currentActivity = this.props.currentEvent;
    if (type === 'workshop') currentActivity = this.props.currentWorkshop;
    if (id && !currentActivity) return null;

    return (
      <View className='createUpdateActivityPage'>
        {/** Notification dropdown */}
        <AtMessage />
        <AdminActivityForm
          activity={id ? currentActivity : null}
          onSubmitActivity={this._handleReceiveActivity}
        />
      </View>
    )
  }
}

export default CreateUpdateActivityPage
