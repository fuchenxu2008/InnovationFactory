import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import BookmarkIcon from '../BookmarkIcon';

import './index.scss';

class GradientHeader extends Component {
  render() {
    const { pageTitle } = this.props;
    return (
      <View className='gradient-header'>
        <View className='bookmarkicon'>
          <BookmarkIcon />
        </View>
        <View className='page-title'>{pageTitle}</View>
      </View>
    );
  }
}

export default GradientHeader;