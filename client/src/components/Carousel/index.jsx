import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';

import './index.scss';

class Carousel extends Component {
  render() {
    // const { img, titleZH, titleEN, onClick } = this.props;
    return (
      <View className='carousel' style={{ transform: 'translateY(160rpx)' }}>
        <Swiper
          className='carousel-swiper'
          indicatorColor='white'
          indicatorActiveColor='rgb(141, 92, 243)'
          circular
          indicatorDots
          // autoplay
        >
          <SwiperItem className='carousel-swiperitem'>
            <View className='demo-text'>
              <Image src='../../assets/images/仪器预约.png' mode='widthFix' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text'>
              <Image src='../../assets/images/仪器预约.png' mode='widthFix' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text'>
              <Image src='../../assets/images/仪器预约.png' mode='widthFix' />
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

export default Carousel;