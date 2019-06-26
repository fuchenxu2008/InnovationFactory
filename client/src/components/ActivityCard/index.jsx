import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import 'animate.css';
import { ROOT_URL } from '../../config/index';
import './index.scss';

class ActivityCard extends Component {
  render() {
    if (!this.props.activity) return null;
    const { _id, albumPicPath, title, subtitle, startTime } = this.props.activity;
    return (
      <View
        className='activitycard animated fadeInDown'
        onClick={() => this.props.onClick(_id)}
      >
        {
          albumPicPath &&
          <Image
            src={`${ROOT_URL}${albumPicPath}`}
            className='activitycard-img'
            mode='aspectFill'
          />
        }
        <View className='activitycard-content'>
          <View className='activitycard-title'>{title}</View>
          <View className='activitycard-subtitle'>{subtitle}</View>
          <View className='activitycard-time'>{startTime}</View>
        </View>
        <View className='activitycard-btn-group'>

        </View>
      </View>
    )
  }
}

export default ActivityCard;
