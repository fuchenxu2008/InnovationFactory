import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { ROOT_URL } from '../../config/index';
import './index.scss';

class OrderCard extends Component {
    render() {
      const { type, order } = this.props;
      if (!order || !type) return null;
      const { _id, created_at } = order;
      const activity = order[type];

      return (
        <View className='ordercard'>
          {
            activity.albumPicPath &&
            <Image
              src={`${ROOT_URL}${activity.albumPicPath}`}
              mode='aspectFill'
              className='ordercard-img'
            />
          }
          <View className='ordercard-detail'>
            <View>订单编号： {_id}</View>
            <View>下单时间： {created_at}</View>
            <View>活动名称： {activity.title}</View>
          </View>
        </View>
      )
    }
}

export default OrderCard;