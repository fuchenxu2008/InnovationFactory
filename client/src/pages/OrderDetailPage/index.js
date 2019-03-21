import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import LoadingIndicator from '../../components/LoadingIndicator'
import { getMyOrder, cancelMyOrder } from '../../actions/order'
import createLoadingSelector from '../../selectors/loadingSelector'
import { ROOT_URL } from '../../config'

import './index.scss'

@connect(({ order, loading }) => ({
  currentOrder: order.currentOrder,
  isFetching: createLoadingSelector(['GET_MY_ORDER', 'CANCEL_MY_ORDER'])(loading),
}), (dispatch) => ({
  getMyOrder: ({ type, id }) => dispatch(getMyOrder({ type, id })),
  cancelMyOrder: ({ type, id }) => dispatch(cancelMyOrder({ type, id })),
}))
class OrderDetailPage extends Component {
  config = {
    navigationBarTitleText: '订单详情',
  }

  componentDidMount() {
    const { type, id } = this.$router.params;
    this.props.getMyOrder({ type, id });
  }

  _handleCancelOrder = () => {
    const { type, id } = this.$router.params;
    this.props.cancelMyOrder({ type, id })
      .then(() => Taro.navigateBack())
  }

  render () {
    const { type, id } = this.$router.params;
    const { isFetching, currentOrder } = this.props;
    if (!currentOrder) return null;
    const { created_at, form, printer, timeSlot, guidance, activity } = currentOrder;
    const order = type === 'printer' ? {
      instance: printer,
      info: {
        ...form,
        timeSlot,
        guidance,
      }
    } : {
      instance: activity,
      info: {
        ...form,
      }
    };

    return (
      <View className='orderDetailPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
        <View className='order-image-container'>
          <Image
            src={`${ROOT_URL}${order.instance.albumPicPath}`}
            mode={type === 'printer' ? 'aspectFit' : 'aspectFill'}
            className='order-image'
          />
        </View>
        <View className='order-detail-section'>
          <View>
            <View className='order-heading'>报名信息</View>
            <View className='order-detail-table'>
              {
                Object.keys(order.info).map((field, i) => (
                  <View key={`form-${id}-${i}`} className='order-detail-row'>
                    <Text>{field}</Text>
                    <Text>{order.info[field]}</Text>
                  </View>
                ))
              }
            </View>
          </View>
          <View>
            下单时间：{created_at}
          </View>
          {
            order.instance.cancellable !== false &&
            <AtButton
              type='primary'
              onClick={this._handleCancelOrder}
              className='cancel-btn'
            >取消订单</AtButton>
          }
        </View>
      </View>
    )
  }
}

export default OrderDetailPage
