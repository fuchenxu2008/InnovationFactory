import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton, AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getMyOrders } from '../../actions/order'
import './index.scss'

@connect(({ global, order }) => ({
  currentUser: global.currentUser,
  myOrders: order.myOrders,
}), (dispatch) => ({
  getMyOrders: (type, openid) => dispatch(getMyOrders(type, openid))
}))
class MyOrderPage extends Component {
  config = {
    navigationBarTitleText: '我的订单'
  }

  state = {
    
  }

  componentDidMount() {
    const { type } = this.$router.params;
    const { currentUser } = this.props;
    if (currentUser) {
      this.props.getMyOrders(type, currentUser.openid);
    }
  }

  render () {
    const { type } = this.$router.params;
    if (!type) return null;
    const myOrders = this.props.myOrders[type] || [];

    return (
      <View className='myOrderPage'>
        <View>My {type} orders</View>
        <View>
          {
            myOrders.map(order => (
              <View key={order._id}>
                <View>{order.user}</View>
                <View>{order.created_at}</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default MyOrderPage
