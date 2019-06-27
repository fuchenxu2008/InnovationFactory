import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
import { login, setUserInfo } from './actions/global'

import Index from './pages/index'

import './app.scss'

import configStore from './store'

const store = configStore()

dayjs.locale({
  ...en,
  weekStart: 1,
})

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/DemandPage/index',
      'pages/KickstarterPage/index',
      'pages/CreateUpdateProjectSupportPage/index',
      'pages/LatestActivityPage/index',
      'pages/ActivityDetailPage/index',
      'pages/BrowsePrinterPage/index',
      'pages/SignUpPage/index',
      'pages/ProfilePage/index',
      'pages/SupportPage/index',
      'pages/MyOrderPage/index',
      'pages/OrderDetailPage/index',
      'pages/WebViewPage/index',
      'pages/SearchPage/index',
      // Admin pages
      'pages/AdminHomePage/index',
      'pages/ManageActivityPage/index',
      'pages/ManagePrinterPage/index',
      'pages/CreateUpdateActivityPage/index',
      'pages/CreateUpdateCategoryPage/index',
      'pages/ManageOrderPage/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
      // navigationStyle: "custom"
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/icons/home.png',
          selectedIconPath: 'assets/icons/home_selected.png'
        },
        {
          pagePath: 'pages/ProfilePage/index',
          iconPath: 'assets/icons/user.png',
          selectedIconPath: 'assets/icons/user_selected.png'
        }
      ],
      borderStyle: 'white'
    }
  };

  componentDidMount() {
    const { currentUser } = store.getState().global || {};
    if (!currentUser)
      // New user
      store.dispatch(login());
    else {
      // existing user
      Taro.checkSession().catch(() => store.dispatch(login()));
      Taro.getSetting().then(({ authSetting }) => {
        if (authSetting['scope.userInfo']) {
          Taro.getUserInfo().then(res => {
            if (
              JSON.stringify(res.userInfo) !==
              JSON.stringify(currentUser.userInfo)
            )
              store.dispatch(setUserInfo(res.userInfo));
          });
        }
      });
    }

    // Manage update
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      if (res.hasUpdate) console.log('Has update');
    });
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(() => {
      // 新版本下载失败
      Taro.showToast({
        title: 'Update failed...',
        icon: 'none'
      });
    });
  }

  // componentDidShow () {}
  // componentDidHide () {}
  // componentCatchError () {}
  // componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'))
