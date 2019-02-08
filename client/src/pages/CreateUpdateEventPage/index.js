import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addEvent, updateEvent, getEvent } from '../../actions/event'
import AdminEventForm from '../../components/AdminEventForm'

import './index.scss'

@connect(({ event }) => ({
  currentEvent: event.currentEvent,
}), (dispatch) => ({
  addEvent: (event) => dispatch(addEvent(event)),
  updateEvent: (edition) => dispatch(updateEvent(edition)),
  getEvent: (eventid) => dispatch(getEvent(eventid))
}))
class CreateUpdateEventPage extends Component {
  config = {
    navigationBarTitleText: 'Add Event'
  }

  componentDidMount() {
    const { id } = this.$router.params;
    if (id) this.props.getEvent(id);
  }

  _handleReceiveEvent = (event) => {
    const { id } = this.$router.params;
    id
      ? this.props.updateEvent({ id, event })
        .then(() => Taro.navigateBack())
      : this.props.addEvent(event)
        .then(() => Taro.navigateBack())
  }

  render () {
    // If id exist, then it's editing event; else would be creating new event
    const { id } = this.$router.params;
    return (
      <View className='createUpdateEventPage'>
        {/** Notification dropdown */}
        <AtMessage />
        <AdminEventForm
          event={id ? this.props.currentEvent : null}
          onSubmitEvent={this._handleReceiveEvent}
        />
      </View>
    )
  }
}

export default CreateUpdateEventPage
