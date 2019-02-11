import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton, AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getMyOrders } from '../../actions/order'
import OrderCard from '../../components/OrderCard'
import './index.scss'

@connect(({ global, order }) => ({
  currentUser: global.currentUser,
  myOrders: order.myOrders,
}), (dispatch) => ({
  getMyOrders: (type) => dispatch(getMyOrders(type))
}))
class MyOrderPage extends Component {
  config = {
    navigationBarTitleText: '我的订单'
  }

  state = {
    
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
