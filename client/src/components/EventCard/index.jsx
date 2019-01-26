import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { ROOT_URL } from '../../config/index';
import './index.scss';

class EventCard extends Component {
    render() {
      const { albumPicPath, title, desc, startTime } = this.props.event;
      return (
        <View className='eventcard'>
          <Image
            src={`${ROOT_URL}${albumPicPath}`}
            className='eventcard-img'
            mode='aspectFill'
          />
          <View className='eventcard-content'>
            <View className='eventcard-titleEN'>{title}</View>
            {
              <View className='eventcard-titleZH'>{desc}</View>
            }
            <View className='eventcard-time'>{startTime}</View>
          </View>
          <View className='eventcard-btn-group'>
          
          </View>
        </View>
      )
    }
}

EventCard.defaultProps = {
  event: {
    albumPicPath: '',
    title: 'Explore Innovation@IIH',
    desc: 'IIH 创新探索 - 迅达Shindler',
    startTime: '12-16',
  },
}

export default EventCard;