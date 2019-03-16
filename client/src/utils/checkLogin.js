import Taro from '@tarojs/taro';

export default function checkLogin(currentUser = {}) {
  if (!currentUser.userInfo) {
    Taro.switchTab({
      url: '/pages/ProfilePage/index',
    }).then(() => {
      Taro.showToast({
        title: 'Please login!',
        icon: 'none',
      });
    })
    return false;
  }
  return true;
}
