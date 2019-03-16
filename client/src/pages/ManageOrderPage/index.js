import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
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
  exportOrderToEmail: (type, recipient) => dispatch(exportOrderToEmail(type, recipient)),
}))
class ManageOrderPage extends Component {
  config = {
    navigationBarTitleText: '收到的订单'
  }

  state = {
    orderType: orderTypes[0],
    filter: 'All',
    recipient: '',
  }

  componentDidMount() {
    this._getOrders();
  }

  _getOrders = () => {
    const { orderType } = this.state;
    if (orderType) this.props.getAllUserOrders(orderType);
  }

  _handleChangeOrderType = (orderTypeIndex = 0) => {
    this.setState({
      orderType: orderTypes[orderTypeIndex],
      filter: 'All',
    }, () => this._getOrders());
  }

  _handleFilterChange = (filterArr, e) => {
    this.setState({ filter: filterArr[e.detail.value] });
  }

  _exportToEmail = () => {
    const { orderType, recipient } = this.state;
    if (orderType) this.props.exportOrderToEmail(orderType, recipient);
  }

  render () {
    const { orderType, filter } = this.state;
    let orders = this.props.allUserOrders[orderType] || [];
    let filteredOrders = (filter === 'All')
      ? orders
      : orders.filter(order => {
        return orderType === 'printer'
          ? order.printer === filter
          : order.activity === filter;
      })
    const filterArr = ['All', ...new Set(orders.map(order => orderType === 'printer' ? order.printer : order.activity))];

    return (
      <View className='manageOrderPage'>
        {
          this.props.isFetching &&
          <LoadingIndicator />
        }
        <View className='manageOrderPage-title'>收到的订单</View>
        <AtButton type='primary' onClick={this._exportToEmail} className='export-btn'>Export to Email</AtButton>
        <AtSegmentedControl
          values={['Event', 'Workshop', 'Printer']}
          onClick={this._handleChangeOrderType}
          current={orderTypes.indexOf(orderType)}
          className='segmented-control'
        />
        <Picker mode='selector' range={filterArr} onChange={this._handleFilterChange.bind(this, filterArr)}>
          <View className='picker-section'>
            <View className='picker-title'>Filter</View>
            <View className='picker'>
              <View className='picker-value'>{filter}</View>
            </View>
          </View>
        </Picker>
        <View className='myOrderList'>
          <AdminOrderTable orders={filter === 'All' ? orders : filteredOrders} />
        </View>
      </View>
    )
  }
}

export default ManageOrderPage
