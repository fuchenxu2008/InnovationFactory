import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

import './index.scss'

class WebViewPage extends Component {
  onShareAppMessage () {
    const { link } = this.$router.params;
    return {
      path: `/pages/WebViewPage/index?link=${link}`,
    }
  }

  render () {
    return (
      <View className='webView'>
        <WebView src={this.$router.params.link}></WebView>
      </View>
    )
  }
}

export default WebViewPage
