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

  _goActivityManagePage = (type) => {
    Taro.navigateTo({
      url: `/pages/ManageActivityPage/index?type=${type}`
    })
  }

  render () {
    return (
      <View className='adminHomePage'>
        <View className='adminHomePage-title'>Admin Center</View>
        <View className='adminHomePage-btnGroup'>
          <AtButton onClick={this._goActivityManagePage.bind(this, 'event')}>Manage Event</AtButton>
          <AtButton onClick={this._goActivityManagePage.bind(this, 'workshop')}>Manage Workshop</AtButton>
          <AtButton onClick={this._goActivityManagePage}>Manage Printer</AtButton>
        </View>
      </View>
    )
  }
}

export default AdminHomePage
