import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getMyKickstarters } from '../../actions/kickstarter';
import { getMyDemands } from '../../actions/demand';
import { ROOT_URL } from '../../config'
import event from '../../utils/event';

import './index.scss'

@connect(({ loading, global }) => ({
  currentUser: global.currentUser,
  isFetching: createLoadingSelector(['GET_KICKSTARTERS', 'GET_DEMANDS'])(loading),
}), (dispatch) => ({
  getMyKickstarters: () => dispatch(getMyKickstarters()),
  getMyDemands: () => dispatch(getMyDemands()),
}))
class MyProjectPage extends Component {
  config = {
    navigationBarTitleText: 'My Project',
  }

  state = {
    kickstarters: [],
    demands: []
  }

  componentDidMount() {
    this._getMyProjects();
    event.on('onUpdate', this, this._getMyProjects);
  }

  _getMyProjects = () => {
    const { type } = this.$router.params;
    if (type === 'demand')
      this.props.getMyDemands()
        .then((demands) => this.setState({ demands }))
    else if (type === 'kickstarter')
      this.props.getMyKickstarters()
        .then((kickstarters) => this.setState({ kickstarters }))
  }

  _goToDetailPage = (id) => {
    const { type } = this.$router.params;
    if (type === 'demand')
      Taro.navigateTo({
        url: `/pages/DemandPage/DemandDetailPage?id=${id}`
      });
    else if (type === 'kickstarter')
      Taro.navigateTo({
        url: `/pages/KickstarterPage/KickstarterDetailPage?id=${id}`
      });
  }

  render () {
    const { type } = this.$router.params;
    const { demands, kickstarters } = this.state;
    if (!type) return;
    const projects = type === 'demand' ? demands : kickstarters;

    return (
      <View className='projectPage'>
        <View className='background-grey' />
        {this.props.isFetching && <LoadingIndicator />}
        <View className='projectPage-title'>My {type}</View>
        {projects.map(project => (
          <View className='project-card' key={project._id} onClick={() => this._goToDetailPage(project._id)}>
            {
              project.imgUrls && project.imgUrls.length &&
              <Image className='project-img' src={`${ROOT_URL}${project.imgUrls[0]}`} mode='aspectFill' />
            }
            <View className='project-title'>{project.title}</View>
            <View className='project-desc'>{project.description}</View>
            <View className='project-time'>{project.created_at}</View>
            <View className='project-time'>{project.achieved ? 'Achieved' : ''}</View>
          </View>
        ))}
      </View>
    )
  }
}

export default MyProjectPage
