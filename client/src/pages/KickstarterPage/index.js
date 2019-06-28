import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import { connect } from '@tarojs/redux';
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getKickstarters } from '../../actions/kickstarter';
import { ROOT_URL } from '../../config'
import checkLogin from '../../utils/checkLogin';

import './index.scss'

@connect(({ loading, global }) => ({
  currentUser: global.currentUser,
  isFetching: createLoadingSelector(['GET_KICKSTARTERS'])(loading),
}), (dispatch) => ({
  getKickstarters: () => dispatch(getKickstarters()),
}))
class KickstarterPage extends Component {
  config = {
    navigationBarTitleText: 'Kickstarter',
  }

  state = {
    kickstarters: [],
  }

  componentDidMount() {
    this.props.getKickstarters()
      .then((kickstarters) => this.setState({ kickstarters }))
  }

  _addNewKickstarter = () => {
    if (!checkLogin(this.props.currentUser)) return;
    Taro.navigateTo({
      url: '/pages/CreateUpdateProjectSupportPage/index?type=kickstarter'
    })
  }

  _goToDetailPage = (id) => {
    Taro.navigateTo({
      url: `KickstarterDetailPage?id=${id}`
    });
  }

  render () {
    return (
      <View className='kickstarterPage'>
        {this.props.isFetching && <LoadingIndicator />}
        <View className='kickstarterPage-title'>Kickstarter Nest</View>
        {this.state.kickstarters.map(kickstarter => (
          <View className='kickstarter-card' key={kickstarter._id} onClick={() => this._goToDetailPage(kickstarter._id)}>
            {
              kickstarter.imgUrls && kickstarter.imgUrls.length &&
              <Image className='kickstarter-img' src={`${ROOT_URL}${kickstarter.imgUrls[0]}`} mode='aspectFill' />
            }
            <View className='kickstarter-title'>{kickstarter.title}</View>
            <View className='kickstarter-desc'>{kickstarter.description}</View>
            <View className='kickstarter-time'>{kickstarter.created_at}</View>
            <View className='kickstarter-time'>{kickstarter.achieved ? 'Achieved' : ''}</View>
          </View>
        ))}
        <View className='add-btn'>
          <AtFab onClick={this._addNewKickstarter}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
      </View>
    )
  }
}

export default KickstarterPage
