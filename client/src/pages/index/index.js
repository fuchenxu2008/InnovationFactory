import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

// import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'


// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  _login = () => {
    Taro.getSetting()
      .then(res => res.authSetting)
      .then(authSetting => {
        if (authSetting['scope.userInfo']) {
          Taro.getUserInfo()
            .then(res => console.log(res))
        }
      })
  }

  _goManageEventPage = () => {
    Taro.navigateTo({
      url: '/pages/EventManagePage/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <View><Text>Test Login</Text></View>
        <Button open-type='getUserInfo' onGetUserInfo={this._login}>Login</Button>
        <View><Text>Admin Page</Text></View>
        <Button onClick={this._goManageEventPage}>View Event</Button>
      </View>
    )
  }
}

export default Index
