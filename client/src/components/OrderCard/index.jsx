import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { ROOT_URL } from '../../config/index';
import './index.scss';

class OrderCard extends Component {
  _handleEnterOrderDetail = () => {
    const { type, order } = this.props;
    Taro.navigateTo({
      url: `/pages/OrderDetailPage/index?type=${type}&id=${order._id}`
    })
  }

  render() {
    const { type, order } = this.props;
    if (!order || !type) return null;
    const { _id, created_at } = order;
    const instance = type === 'printer' ? order.printer : order.activity;
    const name = type === 'printer' ? `${instance.type}${instance.class}` : instance.title;

    return (
      <View className='ordercard' onClick={this._handleEnterOrderDetail}>
        {
          instance.albumPicPath &&
          <Image
            src={`${ROOT_URL}${instance.albumPicPath}`}
            mode={type === 'printer' ? 'aspectFit' : 'aspectFill'}
            className='ordercard-img'
          />
        }
        <View className='ordercard-detail'>
          <View>订单编号： {_id}</View>
          <View>下单时间： {created_at}</View>
          <View>活动名称： {name}</View>
        </View>
      </View>
    )
  }
}

export default OrderCard;
