import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import { setUserInfo, authenticateAdmin, logout, cleanCache } from '../../actions/global'
import { VERSION_CODE } from '../../config';

import './index.scss'

@connect(({ global }) => ({
  currentUser: global.currentUser,
  adminAccessBefore: global.adminAccessBefore,
}), (dispatch) => ({
  setUserInfo: (info) => dispatch(setUserInfo(info)),
  logout: () => dispatch(logout()),
  authenticateAdmin: () => dispatch(authenticateAdmin()),
  cleanCache: () => dispatch(cleanCache()),
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

  _handleLogout = () => {
    this.props.logout();
    Taro.showToast({
      title: 'Logged out',
      icon: 'success'
    });
  }

  _handleCleanCache = () => {
    this.props.cleanCache();
    Taro.showToast({
      title: 'Cache cleaned',
      icon: 'success'
    });
  }

  _handleSecretTap = () => {
    this.setState((prevState) => ({
        secretTap: prevState.secretTap >= 4 ? 0 : prevState.secretTap + 1,
    }), () => {
      if (this.state.secretTap === 4) this._authenticateAdmin();
    })
  }

  _authenticateAdmin = () => {
    const fetchPermitAndAccessIfValid = () => {
      this.props.authenticateAdmin().then(() => {
        if (this.props.adminAccessBefore) { // If got permit, check if expire
          if (dayjs().isBefore(dayjs(this.props.adminAccessBefore))) {
            this._goAdminPage();
          }
        }
      })
    }
    if (!this.props.adminAccessBefore) {  // If no access permit, request for permit
      fetchPermitAndAccessIfValid();
    } else {  // Already has permit, check if expire
      if (dayjs().isBefore(dayjs(this.props.adminAccessBefore))) {
        this._goAdminPage();
      } else { // If expire, refetch permit
        fetchPermitAndAccessIfValid();
      }
    }
  }

  _goAdminPage = () => {
    Taro.navigateTo({
      url: '/pages/AdminHomePage/index'
    })
  }

  render () {
    const { userInfo } = this.props.currentUser || {};

    return (
      <View className='profilePage'>
        <View className='background' />
        <View>
          <View className='gradient-header'>
            <View className='userinfo-section'>
              <View className='userinfo-avatar-nickname'>
                <AtAvatar
                  circle
                  image={userInfo ? userInfo.avatarUrl : require('../../assets/images/default_avatar.png')}
                  size='large'
                  className='userinfo-avatar'
                ></AtAvatar>
                <View className='userinfo-nickname'>{userInfo ? userInfo.nickName : '未登录'}</View>
              </View>
              {
                !userInfo &&
                <Button
                  className='login-btn'
                  open-type='getUserInfo'
                  onGetUserInfo={this._login}
                  plain='true'
                >Login</Button>
              }
            </View>
            {
              // <View className='at-icon at-icon-settings settings-icon' />
            }
          </View>
          <View style={{ transform: 'translateY(-30px)' }}>
            {
              userInfo &&
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
            }
            <View className='user-data-section'>
              <View className='user-data-entry' onClick={() => {}}>
                <View className='iconfont icon-support entry-icon'>{' '}帮助与支持</View>
                <View className='at-icon at-icon-chevron-right' />
              </View>
              <View className='user-data-entry' onClick={() => {}}>
                <View className='iconfont icon-about entry-icon'>{' '}关于我们</View>
                <View className='at-icon at-icon-chevron-right' />
              </View>
              <View className='user-data-entry' onClick={this._handleCleanCache}>
                <View className='iconfont icon-shenqingzuofei entry-icon'>{' '}清除缓存</View>
                <View className='at-icon at-icon-chevron-right' />
              </View>
              {
                userInfo &&
                <View className='user-data-entry' onClick={this._handleLogout}>
                  <View className='iconfont icon-Group entry-icon'>{' '}注销登录</View>
                  <View className='at-icon at-icon-chevron-right' />
                </View>
              }
            </View>
            <View onClick={this._handleSecretTap} className='secretAdminEntrance'>
              v{VERSION_CODE}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ProfilePage
