import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtSegmentedControl, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getAllUserOrders, getDistinctInstances } from '../../actions/order'
import AdminOrderTable from '../../components/AdminOrderTable'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'
import { ROOT_URL } from '../../config'

import './index.scss'

const orderTypes = ['event', 'workshop', 'printer'];

@connect(({ global, order, loading }) => ({
  currentUser: global.currentUser,
  allUserOrders: order.allUserOrders,
  distinctInstances: order.distinctInstances,
  isFetching: createLoadingSelector(['GET_ALL_USER_ORDERS'])(loading),
}), (dispatch) => ({
  getAllUserOrders: ({ type, instanceId }) => dispatch(getAllUserOrders({ type, instanceId })),
  getDistinctInstances: () => dispatch(getDistinctInstances()),
}))
class ManageOrderPage extends Component {
  config = {
    navigationBarTitleText: '收到的订单'
  }

  state = {
    orderType: orderTypes[2],
    filter: { title: 'All' },
  }

  componentDidMount() {
    this.props.getDistinctInstances();
  }

  _getOrders = () => {
    const { orderType, filter } = this.state;
    if (orderType) this.props.getAllUserOrders({
      type: orderType,
      instanceId: filter._id ? filter._id : '',
    });
  }

  _handleChangeOrderType = (orderTypeIndex = 0) => {
    this.setState({
      orderType: orderTypes[orderTypeIndex],
      filter: { title: 'All' }, // default to all
    });
  }

  // instance picker
  _handleFilterChange = (filterArr, e) => {
    this.setState({ filter: filterArr[e.detail.value] });
  }

  _copyDownloadLink = () => {
    const { orderType, filter } = this.state;
    const token = (this.props.currentUser || {}).token;
    const instanceType = orderType === 'printer' ? 'printer' : 'activity'; // In order to provide searchTerm for ActivityOrder or PrinterOrder
    const instanceSelect = filter._id ? `&${instanceType}=${filter._id}` : '';
    Taro.setClipboardData({
      data: `${ROOT_URL}/api/admin/order/${orderType}?token=${token}&toExcel=1${instanceSelect}`,
    }).then(() => Taro.showToast({
      title: 'Download link copied',
      icon: 'success',
      duration: 2000
    }))
  }

  render () {
    const { distinctInstances, allUserOrders } = this.props;
    const { orderType, filter } = this.state;

    const filterArr = [
      { title: 'All' },
      ...(distinctInstances[orderType] || []),
    ];
    const filterTextArr = filterArr.map(filterObj => filterObj.title);

    let orders = allUserOrders[orderType] || {};
    if (filter._id) orders = orders[filter._id] || [];
    else orders = [].concat.apply([], (Object.values(orders)));

    return (
      <View className='manageOrderPage'>
        {
          this.props.isFetching &&
          <LoadingIndicator />
        }
        <View className='manageOrderPage-title'>收到的订单</View>
        <AtButton type='primary' onClick={this._copyDownloadLink} className='export-btn'>Copy Download Link</AtButton>
        <AtSegmentedControl
          values={['Event', 'Workshop', 'Printer']}
          onClick={this._handleChangeOrderType}
          current={orderTypes.indexOf(orderType)}
          className='segmented-control'
        />
        <Picker mode='selector' range={filterTextArr} onChange={(e) => this._handleFilterChange(filterArr, e)}>
          <View className='picker-section'>
            <View className='picker-title'>Filter</View>
            <View className='picker'>
              <View className='picker-value'>{filter.title}</View>
            </View>
          </View>
        </Picker>
        <AtButton onClick={this._getOrders} className='query-btn'>查询</AtButton>
        <View className='myOrderList'>
          {
            <AdminOrderTable orders={orders} />
          }
        </View>
      </View>
    )
  }
}

export default ManageOrderPage
