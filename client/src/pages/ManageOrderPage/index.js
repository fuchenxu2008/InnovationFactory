import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSegmentedControl, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getAllUserOrders, exportOrderToEmail } from '../../actions/order'
import AdminOrderTable from '../../components/AdminOrderTable'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

const orderTypes = ['event', 'workshop', 'printer'];

@connect(({ order, loading }) => ({
  allUserOrders: order.allUserOrders,
  isFetching: createLoadingSelector(['GET_ALL_USER_ORDERS', 'EXPORT_ORDERS_TO_EMAIL'])(loading),
}), (dispatch) => ({
  getAllUserOrders: (type) => dispatch(getAllUserOrders(type)),
  exportOrderToEmail: (type) => dispatch(exportOrderToEmail(type)),
}))
class ManageOrderPage extends Component {
  config = {
    navigationBarTitleText: '收到的订单'
  }

  state = {
    orderTypeIndex: 0,
  }

  componentDidMount() {
    this._getOrders();
  }

  _getOrders = () => {
    const { orderTypeIndex } = this.state;
    const orderType = orderTypes[orderTypeIndex];
    if (orderType) this.props.getAllUserOrders(orderType);
  }

  _handleChangeOrderType = (orderTypeIndex) => {
    this.setState({ orderTypeIndex }, () => {
      this._getOrders();
    })
  }

  _exportToEmail = () => {
    const { orderTypeIndex } = this.state;
    const orderType = orderTypes[orderTypeIndex];
    if (orderType) this.props.exportOrderToEmail(orderType);
  }

  render () {
    const { orderTypeIndex } = this.state;
    const orderType = orderTypes[orderTypeIndex] || '';
    const orders = this.props.allUserOrders[orderType] || [];
    return (
      <View className='manageOrderPage'>
        {
          this.props.isFetching &&
          <LoadingIndicator />
        }
        <View className='manageOrderPage-title'>收到的订单</View>
        <AtButton onClick={this._exportToEmail}>Export to Email</AtButton>
        <AtSegmentedControl
          values={['Event', 'Workshop', 'Printer']}
          onClick={this._handleChangeOrderType}
          current={orderTypeIndex}
        />
        <View className='myOrderList'>
          <AdminOrderTable orders={orders} />
        </View>
      </View>
    )
  }
}

export default ManageOrderPage
