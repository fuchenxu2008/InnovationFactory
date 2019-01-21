import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'

@connect(({ event }) => ({
  allEvents: event.allEvents,
}))
class ManageEventPage extends Component {

  config = {
    navigationBarTitleText: 'Admin Event'
  }

  state = {
    editing: false,
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
                <Text>Title: {event.title}</Text>{'\n'}
                <Text>Description: {event.description}</Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default ManageEventPage
