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
