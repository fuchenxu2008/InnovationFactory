import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

class KickstarterPage extends Component {
  config = {
    navigationBarTitleText: 'Kickstarter',
  }

  render () {
    return (
      <View className='kickstarterPage'>
        Kickstarter
      </View>
    )
  }
}

export default KickstarterPage
