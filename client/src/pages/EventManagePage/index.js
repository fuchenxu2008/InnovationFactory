import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import EventCard from '../../components/EventCard'
import { getAllEvents, deleteEvent } from "../../actions/event";

import './index.scss'

@connect(({ event }) => ({
  allEvents: event.allEvents,
}), (dispatch) => ({
  getAllEvents() {
    dispatch(getAllEvents())
  },
  deleteEvent(eventid) {
    dispatch(deleteEvent(eventid))
  }
}))
class ManageEventPage extends Component {
  config = {
    navigationBarTitleText: 'Admin Event'
  }

  state = {
    editing: false,
  }

  componentDidMount() {
    this.props.getAllEvents();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  _manageEvent = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  _goAddEventPage = () => {
    Taro.navigateTo({
      url: '/pages/CreateUpdateEventPage/index'
    })
  }

  _editEvent = (eventid) => {
    Taro.navigateTo({
      url: `/pages/CreateUpdateEventPage/index?id=${eventid}`
    })
  }

  _deleteEvent = (eventid) => {
    this.props.deleteEvent(eventid);
  }

  render () {
    const { editing } = this.state;

    return (
      <View className='eventManagePage'>
        <Button onClick={this._manageEvent}>
          {editing ? 'Done' : 'Manage Event'}
        </Button>
        { editing &&
          <View>
            <Button onClick={this._goAddEventPage}>Add Event</Button>
          </View>
        }
        <View className='admin-eventlist'>
          {
            this.props.allEvents.map(event => (
              <View key={event._id} className='admin-event'>
                <View className='admin-event-card'>
                  <EventCard event={event} />
                </View>
                {
                  editing &&
                  <View className='admin-btn-group'>
                    <View
                      className='at-icon at-icon-edit edit-icon'
                      onClick={this._editEvent.bind(this, event._id)}
                    />
                    <View
                      className='at-icon at-icon-trash delete-icon'
                      onClick={this._deleteEvent.bind(this, event._id)}
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

export default ManageEventPage
