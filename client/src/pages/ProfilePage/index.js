import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { setUserInfo } from '../../actions/global'

import './index.scss'

@connect(({ global }) => ({
  currentUser: global.currentUser
}), (dispatch) => ({
  setUserInfo: (info) => dispatch(setUserInfo(info))
}))
class ProfilePage extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  state = {
    secretTap: -1,
  }

  componentDidShow () { console.log('show profile'); }

  componentDidHide () { console.log('hide profile'); }

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

  _handleSecretTap = () => {
      this.setState((prevState) => ({
          secretTap: prevState.secretTap >= 4 ? 0 : prevState.secretTap + 1,
      }), () => {
        if (this.state.secretTap === 4) this._goManageEventPage();
      })
  }

  _goManageEventPage = () => {
    Taro.navigateTo({
      url: '/pages/EventManagePage/index'
    })
  }

  render () {
    const { currentUser } = this.props;
    const { userInfo } = currentUser || {};

    return (
      <View className='profilePage'>
        {
          userInfo
            ? (
              <View>
                <View className='gradient-header' />
                <View className='userinfo-section'>
                  <AtAvatar circle image={userInfo.avatarUrl} size='large'></AtAvatar>
                  <View className='userinfo-nickname'>{userInfo.nickName}</View>
                </View>
                <View className='user-data-section'>
                  <View className='user-data-entry'>我的活动</View>
                  <View className='user-data-entry'>我的课程</View>
                  <View className='user-data-entry'>我的仪器</View>
                </View>
              </View>
            )
            : (
              <View>
                <View>Profile Login</View>
                <AtButton open-type='getUserInfo' onGetUserInfo={this._login}>Login</AtButton>
              </View>
            )
        }
        {
          // <View onClick={this._handleSecretTap}>Tap me {4 - this.state.secretTap}{' '} times</View>
        }

      </View>
    )
  }
}

export default ProfilePage
