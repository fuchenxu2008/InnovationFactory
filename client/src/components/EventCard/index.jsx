import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { ROOT_URL } from '../../config/index';
import './index.scss';

class EventCard extends Component {
    _goToEventDetailPage = (_id) => {
      Taro.navigateTo({
        url: `/pages/EventDetailPage/index?id=${_id}`
      })
    }

    render() {
      const { _id, albumPicPath, title, desc, startTime } = this.props.event;
      return (
        <View className='eventcard' onClick={this._goToEventDetailPage.bind(this, _id)}>
          <Image
            src={`${ROOT_URL}${albumPicPath}`}
            className='eventcard-img'
            mode='aspectFill'
          />
          <View className='eventcard-content'>
            <View className='eventcard-titleEN'>{title}</View>
            {
              // <View className='eventcard-titleZH'>{desc}</View>
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
  event: {},
}

export default EventCard;