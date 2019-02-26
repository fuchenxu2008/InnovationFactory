import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton, AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getMyOrders } from '../../actions/order'
import OrderCard from '../../components/OrderCard'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ global, order, loading }) => ({
  currentUser: global.currentUser,
  myOrders: order.myOrders,
  isFetching: createLoadingSelector(['GET_MY_ORDERS'])(loading),
}), (dispatch) => ({
  getMyOrders: (type) => dispatch(getMyOrders(type))
}))
class MyOrderPage extends Component {
  config = {
    navigationBarTitleText: '我的订单'
  }

  componentDidMount() {
    const { type } = this.$router.params;
    if (this.props.currentUser) {
      this.props.getMyOrders(type);
    }
  }

  render () {
    const { type } = this.$router.params;
    if (!type) return null;
    const myOrders = this.props.myOrders[type] || [];

    return (
      <View className='myOrderPage'>
        {
          this.props.isFetching &&
          <LoadingIndicator />
        }
        <View className='myOrderPage-title'>{`My ${type} Orders`}</View>
        <View className='myOrderList'>
          {
            myOrders.map(order => (
              <OrderCard
                key={order._id}
                order={order}
                type={type}
              />
            ))
          }
        </View>
      </View>
    )
  }
}

export default MyOrderPage
