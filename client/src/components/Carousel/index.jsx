import Taro, { Component } from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { ROOT_URL } from '../../config'

import './index.scss';

class Carousel extends Component {
  _handleSwiperChange = (e) => {
    const { categories, onSwiperChange } = this.props;
    const { current } = e.detail;
    onSwiperChange(categories[current]);
  }

  render() {
    const { categories, onClickItem } = this.props;

    return (
      <View className='carousel'>
        <Swiper
          className='carousel-swiper'
          indicatorColor='white'
          indicatorActiveColor='rgb(141, 92, 243)'
          circular
          indicatorDots
          onChange={this._handleSwiperChange}
          // autoplay
        >
          {
            (categories || []).map(category => (
              <SwiperItem key={category._id} className='carousel-swiperitem' onClick={onClickItem.bind(this, category._id)}>
                <View className='carousel-swiperitem-img-wraper'>
                  <Image src={`${ROOT_URL}${category.albumPicPath}`} mode='widthFix' className='carousel-swiperitem-img' />
                </View>
              </SwiperItem>
            ))
          }
        </Swiper>
      </View>
    )
  }
}

export default Carousel;