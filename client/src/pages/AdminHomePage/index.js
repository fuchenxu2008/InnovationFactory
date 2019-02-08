import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import { connect } from '@tarojs/redux'

import './index.scss'

// @connect(({ event }) => ({
//   allEvents: getOrdedAllEvents(event),
// }), (dispatch) => ({
//   getAllEvents: () => dispatch(getAllEvents()),
//   deleteEvent: (eventid) => dispatch(deleteEvent(eventid))
// }))
class AdminHomePage extends Component {
  config = {
    navigationBarTitleText: 'Admin HomePage'
  }

  state = {
  }

  _goEventManagePage = () => {
    Taro.navigateTo({
      url: '/pages/EventManagePage/index'
    })
  }

  render () {
    return (
      <View className='adminHomePage'>
        Admin Hub
        <AtButton onClick={this._goEventManagePage}>Manage Event</AtButton>
        <AtButton onClick={this._goEventManagePage}>Manage Workshop</AtButton>
        <AtButton onClick={this._goEventManagePage}>Manage Printer</AtButton>
      </View>
    )
  }
}

export default AdminHomePage
