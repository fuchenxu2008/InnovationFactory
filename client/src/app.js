import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import { login } from './actions/global'

import Index from './pages/index'

import './app.scss'

import configStore from './store'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/LatestEventPage/index',
      'pages/index/index',
      'pages/EventManagePage/index',
      'pages/AddEventPage/index',
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
          // text: "Home",
          iconPath: "assets/icons/home.png",
          selectedIconPath: "assets/icons/home_selected.png"
        },
        {
          "pagePath": "pages/EventManagePage/index",
          // "text": "Admin",
          iconPath: "assets/icons/user.png",
          selectedIconPath: "assets/icons/user_selected.png"
        }
      ],
      borderStyle: 'white',
      // color: 'black',
      // selectedColor: 'blue',
      // backgroundColor: 'grey',
    }
  }

  componentDidMount () {
    Taro.checkSession()
      .then(() => {
        if (!store.getState().global.currentUser) {
          store.dispatch(login())
        }
      })
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
