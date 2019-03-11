import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getAllUserOrders } from '../../actions/order'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ order, loading }) => ({
  allUserOrders: order.allUserOrders,
  isFetching: createLoadingSelector(['GET_ALL_USER_ORDERS'])(loading),
}), (dispatch) => ({
  getAllUserOrders: (type) => dispatch(getAllUserOrders(type)),
}))
class ManageOrderPage extends Component {
  config = {
    navigationBarTitleText: '收到的订单'
  }

  state = {
    orderType: 'workshop',
  }

  componentDidMount() {
    this.props.getAllUserOrders(this.state.orderType);
  }

  render () {
    const { orderType } = this.state;
    const orders = this.props.allUserOrders[orderType] || [];
    return (
      <View className='myOrderPage'>
        {
          this.props.isFetching &&
          <LoadingIndicator />
        }
        <View className='myOrderPage-title'>收到的订单</View>
        <View className='myOrderList'>
          {
            orders.map(order => (
              <View key={order._id}>
                <View>{order[orderType]}</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default ManageOrderPage
