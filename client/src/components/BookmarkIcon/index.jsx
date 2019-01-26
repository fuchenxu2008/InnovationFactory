import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

class BookmarkIcon extends Component {
  render() {
    return (
      <View className='bookmarkicon' style={this.props.style}>
        <View className='bookmarkicon-uppersquare' />
        <View className='bookmarkicon-semicircle' />
      </View>
    )
  }
}

export default BookmarkIcon;