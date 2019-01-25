import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.scss';

class EventCard extends Component {
    render() {
      return (
        <View className='eventcard'>
          <Image
            src='https://www.mensjournal.com/wp-content/uploads/mf/low_body_fat_muscular_muscle_abs_chest_main.jpg?w=1200&h=675&crop=1'
            className='eventcard-img'
            mode='aspectFill'
          />
          <View className='eventcard-content'>
            <View className='eventcard-titleEN'>Explore Innovation@IIH</View>
            <View className='eventcard-titleZH'>IIH 创新探索 - 迅达Shindler</View>
            <View className='eventcard-time'>12-16</View>
          </View>
          <View className='eventcard-btn-group'>
          
          </View>
        </View>
      )
    }
}

export default EventCard;