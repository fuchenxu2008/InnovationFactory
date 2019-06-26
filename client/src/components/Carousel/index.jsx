import Taro, { Component } from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { ROOT_URL } from '../../config'

import './index.scss';

class Carousel extends Component {
  state = {
    currentIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    const categories = nextProps.categories || [];
    if (categories.length <= this.state.currentIndex) {
      const updatedIndex = categories.length > 1 ? categories.length - 1 : 0;
      this.setState({ currentIndex: updatedIndex });
      this.props.onSwiperChange(categories[updatedIndex]);
    }
  }

  _handleSwiperChange = (e) => {
    const { categories, onSwiperChange } = this.props;
    const { current } = e.detail;
    onSwiperChange(categories[current]);
    this.setState({ currentIndex: current })
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
          current={this.state.currentIndex}
          // autoplay
        >
          {
            (categories || []).map(category => (
              <SwiperItem key={category._id} onClick={() => onClickItem(category._id)}>
                <View>
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
