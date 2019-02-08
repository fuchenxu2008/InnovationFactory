import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { ROOT_URL } from '../../config/index';
import './index.scss';

class OrderCard extends Component {
    render() {
      if (!this.props.order) return null;
      const { _id, created_at, event } = this.props.order;
      return (
        <View className='ordercard'>
          <Image
            src={`${ROOT_URL}${event.albumPicPath}`}
            mode='aspectFill'
            className='ordercard-img'
          />
          <View className='ordercard-detail'>
            <View>订单编号： {_id}</View>
            <View>下单时间： {created_at}</View>
            <View>活动名称： {event.title}</View>
          </View>
        </View>
      )
    }
}

export default OrderCard;