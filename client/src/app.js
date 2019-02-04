import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import { login } from './actions/global'

import Index from './pages/index'

import './app.scss'

import configStore from './store'

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/LatestEventPage/index',
      'pages/EventDetailPage/index',
      'pages/SignUpPage/index',
      'pages/ProfilePage/index',
      'pages/MyOrderPage/index',
      // Admin pages
      'pages/EventManagePage/index',
      'pages/CreateUpdateEventPage/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      pageOrientation: "auto"
    },
    tabBar: {
      list: [{
          pagePath: "pages/index/index",
          iconPath: "assets/icons/home.png",
          selectedIconPath: "assets/icons/home_selected.png"
        },
        {
          "pagePath": "pages/ProfilePage/index",
          iconPath: "assets/icons/user.png",
          selectedIconPath: "assets/icons/user_selected.png"
        },
      ],
      borderStyle: 'white',
    }
  }

  componentDidMount () {
    if (!store.getState().global.currentUser)
      store.dispatch(login())
    else Taro.checkSession()
      .catch(() => store.dispatch(login()))
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
