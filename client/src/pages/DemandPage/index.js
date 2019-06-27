import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux'
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getDemands } from '../../actions/demand'

import './index.scss'

@connect(({ loading }) => ({
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
    this.props.getDemands()
      .then((demands) => this.setState({ demands }))
  }

  _addNewDemand = () => {
    Taro.navigateTo({
      url: '/pages/CreateUpdateProjectSupportPage/index?type=demand'
    })
  }

  render () {
    return (
      <View className='demandPage'>
        {this.props.isFetching && <LoadingIndicator />}
        Demand
        {this.state.demands.map(demand => (
          <View key={demand._id}>
            <View>{demand.title}</View>
            <View>{demand.description}</View>
            <View>{demand.created_at}</View>
          </View>
        ))}
        <AtButton onClick={this._addNewDemand}>+</AtButton>
      </View>
    );
  }
}

export default DemandPage
