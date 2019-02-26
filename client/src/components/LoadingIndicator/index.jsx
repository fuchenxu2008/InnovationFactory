import Taro, { Component } from '@tarojs/taro';
// import { View } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui'
// import 'animate.css';
// import './index.scss';

class LoadingIndicator extends Component {
  render() {
    return (
      <AtActivityIndicator
        mode='center'
        content='加载中...'
        size={50}
      />
    )
  }
}

export default LoadingIndicator;