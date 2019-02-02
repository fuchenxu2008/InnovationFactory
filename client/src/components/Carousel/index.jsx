import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';

import './index.scss';

class Carousel extends Component {
  render() {
    // const { img, titleZH, titleEN, onClick } = this.props;
    return (
      <View className='carousel'>
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
              <Image src={require('../../assets/images/latestEvent.png')} mode='widthFix' className='carousel-swiperitem-img' />
            </View>
          </SwiperItem>
          <SwiperItem className='carousel-swiperitem'>
            <View className='demo-text'>
              <Image src={require('../../assets/images/workshopBooking.png')} mode='widthFix' className='carousel-swiperitem-img' />
            </View>
          </SwiperItem>
          <SwiperItem className='carousel-swiperitem'>
            <View className='demo-text'>
              <Image src={require('../../assets/images/printerReservation.png')} mode='widthFix' className='carousel-swiperitem-img' />
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

export default Carousel;