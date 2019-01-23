import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getAllEvents } from "../../actions/event";
import { ROOT_URL } from '../../config'

import './index.scss'

@connect(({ event }) => ({
  allEvents: event.allEvents,
}), (dispatch) => ({
  getAllEvents() {
    dispatch(getAllEvents())
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
      url: '/pages/AddEventPage/index'
    })
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
        <Text>All Events</Text>
        <View>
          {
            this.props.allEvents.map((event, i) => (
              <View key={i}>
                <Image src={`${ROOT_URL}${event.albumPicPath}`} />
                <View>Title: {event.title}</View>
                <View>Description: {event.desc}</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default ManageEventPage
