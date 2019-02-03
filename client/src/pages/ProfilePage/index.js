import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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

  _goOrderPage = (type) => {
    Taro.navigateTo({
      url: `/pages/MyOrderPage/index?type=${type}`
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
        <View className='background' />
        {
          userInfo
            ? (
              <View>
                <View className='gradient-header'>
                  <View className='userinfo-section'>
                    <AtAvatar circle image={userInfo.avatarUrl} size='large'></AtAvatar>
                    <View className='userinfo-nickname'>{userInfo.nickName}</View>
                  </View>
                  <View className='at-icon at-icon-settings settings-icon' />
                </View>
                <View className='user-data-section'>
                  <View className='user-data-entry' onClick={this._goOrderPage.bind(this, 'event')}>
                    <View className='iconfont icon-balloon entry-icon'>{' '}我的活动</View>
                    <View className='at-icon at-icon-chevron-right' />
                  </View>
                  <View className='user-data-entry' onClick={this._goOrderPage.bind(this, 'workshop')}>
                    <View className='iconfont icon-platform entry-icon'>{' '}我的课程</View>
                    <View className='at-icon at-icon-chevron-right' />
                  </View>
                  <View className='user-data-entry' onClick={this._goOrderPage.bind(this, 'printer')}>
                    <View className='iconfont icon-yiqiguanlidanweishu entry-icon'>{' '}我的仪器</View>
                    <View className='at-icon at-icon-chevron-right' />
                  </View>
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
          <View onClick={this._handleSecretTap} className='secretAdminEntrance'>
            v0.0.1
          </View>
        }
      </View>
    )
  }
}

export default ProfilePage
