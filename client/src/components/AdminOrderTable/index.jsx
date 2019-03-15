import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import AdminOrderItem from '../AdminOrderItem';
import './index.scss';

class AdminOrderTable extends Component {
    render() {
      const { orders } = this.props;
      if (!orders) return null;

      return (
        <View className='table'>
          {
            <View className='thead'>
              <View className='tr'>
                {
                  Object.keys(orders[0]).map((heading, i) => (
                    <View key={i} className='th'>{heading}</View>
                  ))
                }
              </View>
            </View>
          }
          <View className='tbody'>
            {
              orders.map((order, i) => {
                const orderItems = Object.keys(order);
                return (
                  <View className='tr' key={`order-${i}`}>
                    {
                      orderItems.map((heading, k) => (
                        <View key={`ordercol-${k}`} className='td'>
                          {order[heading]}
                        </View>
                      ))
                    }
                  </View>
                )
              })
            }
        </View>
        </View>
      );
    }
}

export default AdminOrderTable;
