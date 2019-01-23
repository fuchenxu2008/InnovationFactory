import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { setUserInfo } from '../../actions/global'

import './index.scss'

@connect(({ global }) => ({
  currentUser: global.currentUser
}), (dispatch) => ({
  setUserInfo(info) {
    dispatch(setUserInfo(info))
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
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
            .then(res => {
              this.props.setUserInfo(res.userInfo);
            })
        }
      })
  }

  _goManageEventPage = () => {
    Taro.navigateTo({
      url: '/pages/EventManagePage/index'
    })
  }

  render () {
    const { currentUser } = this.props;
    const { userInfo, openid } = currentUser || {};
    console.log('currentUser: ', currentUser);
    return (
      <View className='index'>
        <Text>OpenID: {openid}</Text>
        {
          userInfo
            ? (
              <View style={{ textAlign: 'center' }}>
                <Image src={userInfo.avatarUrl} mode='aspectFit' style={{ width: '100px', height: '100px' }} />
                <View><Text>{userInfo.nickName}</Text></View>
              </View>
            )
            : (
              <View>
                <View><Text>Test Login</Text></View>
                <Button open-type='getUserInfo' onGetUserInfo={this._login}>Login</Button>
              </View>
            )
        }
        <View><Text>Admin Page</Text></View>
        <Button onClick={this._goManageEventPage}>View Event</Button>
      </View>
    )
  }
}

export default Index
