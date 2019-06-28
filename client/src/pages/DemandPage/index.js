import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtFab } from 'taro-ui';
import { connect } from '@tarojs/redux'
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getDemands } from '../../actions/demand'
import { ROOT_URL } from '../../config'
import checkLogin from '../../utils/checkLogin';
import event from '../../utils/event';

import './index.scss'

@connect(({ loading, global }) => ({
  currentUser: global.currentUser,
  isFetching: createLoadingSelector(['GET_DEMANDS'])(loading),
}), (dispatch) => ({
  getDemands: () => dispatch(getDemands()),
}))
class DemandPage extends Component {
  config = {
    navigationBarTitleText: 'Demand',
  }

  state = {
    demands: [],
  }

  componentDidMount() {
    this._getAllDemands();
    event.on('onUpdate', this, this._getAllDemands);
  }

  _getAllDemands = () => {
    this.props.getDemands()
      .then((demands) => this.setState({ demands }))
  }

  _addNewDemand = () => {
    if (!checkLogin(this.props.currentUser)) return;
    Taro.navigateTo({
      url: '/pages/CreateUpdateProjectSupportPage/index?type=demand'
    })
  }

  _goToDetailPage = (id) => {
    Taro.navigateTo({
      url: `DemandDetailPage?id=${id}`
    });
  }

  render () {
    return (
      <View className='demandPage'>
        {this.props.isFetching && <LoadingIndicator />}
        <View className='demandPage-title'>Demand Market</View>
        {this.state.demands.map(demand => (
          <View className='demand-card' key={demand._id} onClick={() => this._goToDetailPage(demand._id)}>
            {
              demand.imgUrls && demand.imgUrls.length &&
              <Image className='demand-img' src={`${ROOT_URL}${demand.imgUrls[0]}`} mode='aspectFill' />
            }
            <View className='demand-title'>{demand.title}</View>
            <View className='demand-desc'>{demand.description}</View>
            <View className='demand-time'>{demand.created_at}</View>
            <View className='demand-time'>{demand.claimed ? 'Claimed' : ''}</View>
          </View>
        ))}
        <View className='add-btn'>
          <AtFab onClick={this._addNewDemand}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
      </View>
    );
  }
}

export default DemandPage
