import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton, AtAvatar } from 'taro-ui'
// import { connect } from '@tarojs/redux'

import './index.scss'

// @connect(({ global }) => ({
//   currentUser: global.currentUser
// }), (dispatch) => ({
//   setUserInfo: (info) => dispatch(setUserInfo(info))
// }))
class MyOrderPage extends Component {
  config = {
    navigationBarTitleText: '我的订单'
  }

  state = {
    
  }

  render () {

    return (
      <View className='myOrderPage'>
    
      </View>
    )
  }
}

export default MyOrderPage
