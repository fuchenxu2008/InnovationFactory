import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtSegmentedControl, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getAllUserOrders } from '../../actions/order'
import AdminOrderTable from '../../components/AdminOrderTable'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'
import { ROOT_URL } from '../../config'

import './index.scss'

const orderTypes = ['event', 'workshop', 'printer'];

@connect(({ global, order, loading }) => ({
  currentUser: global.currentUser,
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
    orderType: orderTypes[0],
    filter: { text: 'All' },
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
      filter: { text: 'All' },
    }, () => this._getOrders());
  }

  _handleFilterChange = (filterArr, e) => {
    this.setState({ filter: filterArr[e.detail.value] });
  }

  _copyDownloadLink = () => {
    const { orderType, filter } = this.state;
    const instanceType = orderType === 'printer' ? 'printer' : 'activity';
    const token = (this.props.currentUser || {}).token;
    const instanceSelect = filter.instanceId ? `&${instanceType}=${filter.instanceId}` : '';
    Taro.setClipboardData({
      data: `${ROOT_URL}/api/admin/order/${orderType}?token=${token}&toExcel=1${instanceSelect}`,
    }).then(() => Taro.showToast({
      title: 'Download link copied',
      icon: 'success',
      duration: 2000
    }))
  }

  render () {
    const { orderType, filter } = this.state;
    let orders = this.props.allUserOrders[orderType] || [];

    const instanceType = orderType === 'printer' ? 'printer' : 'activity';
    let filteredOrders = (filter.text === 'All')
      ? orders
      : orders.filter(order => order[instanceType] === filter.text)
    // Extract unique orders by related activity or printer
    const uniqueOrders = orders.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[instanceType]).indexOf(obj[instanceType]) === pos;
    });

    const filterArr = [
      { text: 'All' },
      ...uniqueOrders.map(order => ({
        text: order[instanceType],
        instanceId: order[`${instanceType}Id`],
      }))
    ];

    const filterTextArr = filterArr.map(filterObj => filterObj.text);

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
        <Picker mode='selector' range={filterTextArr} onChange={this._handleFilterChange.bind(this, filterArr)}>
          <View className='picker-section'>
            <View className='picker-title'>Filter</View>
            <View className='picker'>
              <View className='picker-value'>{filter.text}</View>
            </View>
          </View>
        </Picker>
        <View className='myOrderList'>
          <AdminOrderTable orders={filter.text === 'All' ? orders : filteredOrders} />
        </View>
      </View>
    )
  }
}

export default ManageOrderPage
