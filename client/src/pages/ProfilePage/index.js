import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
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
    navigationBarTitleText: 'ProfilePage'
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
              <View style={{ textAlign: 'center' }}>
                <Image src={userInfo.avatarUrl} mode='aspectFit' style={{ width: '100px', height: '100px' }} />
                <View><Text>{userInfo.nickName}</Text></View>
              </View>
            )
            : (
              <View>
                <View><Text>Profile Login</Text></View>
                <AtButton open-type='getUserInfo' onGetUserInfo={this._login}>Login</AtButton>
              </View>
            )
        }
        <View onClick={this._handleSecretTap}>Tap me {4 - this.state.secretTap}{' '} times</View>
      </View>
    )
  }
}

export default ProfilePage
