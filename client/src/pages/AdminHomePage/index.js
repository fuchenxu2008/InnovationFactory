import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

class AdminHomePage extends Component {
  config = {
    navigationBarTitleText: 'Admin HomePage'
  }

  _goActivityManagePage = (type) => {
    Taro.navigateTo({
      url: `/pages/ManageActivityPage/index?type=${type}`
    })
  }

  _goPrinterManagePage = () => {
    Taro.navigateTo({
      url: `/pages/ManagePrinterPage/index`
    })
  }

  _goOrderManagePage = () => {
    Taro.navigateTo({
      url: `/pages/ManageOrderPage/index`
    })
  }

  render () {
    return (
      <View className='adminHomePage'>
        <View className='adminHomePage-title'>Admin Center</View>
        <View className='adminHomePage-btnGroup'>
          <AtButton onClick={() => this._goActivityManagePage('event')}>Manage Event</AtButton>
          <AtButton onClick={() => this._goActivityManagePage('workshop')}>Manage Workshop</AtButton>
          <AtButton onClick={this._goPrinterManagePage}>Manage Printer</AtButton>
          <AtButton onClick={this._goOrderManagePage}>View Orders</AtButton>
        </View>
      </View>
    )
  }
}

export default AdminHomePage
