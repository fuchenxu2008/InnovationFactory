import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtMessage } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { getDemand, createDemand, updateDemand, deleteDemand } from '../../actions/demand';
import {
  getKickstarter,
  createKickstarter,
  updateKickstarter,
  deleteKickstarter
} from '../../actions/kickstarter';
import ProjectForm from '../../components/ProjectForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import createLoadingSelector from '../../selectors/loadingSelector';
import event from '../../utils/event';

import './index.scss';

@connect(
  ({ loading }) => ({
    isFetching: createLoadingSelector(['GET_DEMAND', 'GET_KICKSTARTER'])(loading)
  }),
  dispatch => ({
    getDemand: id => dispatch(getDemand(id)),
    createDemand: demand => dispatch(createDemand(demand)),
    updateDemand: edition => dispatch(updateDemand(edition)),
    deleteDemand: id => dispatch(deleteDemand(id)),
    getKickstarter: id => dispatch(getKickstarter(id)),
    createKickstarter: kickstarter => dispatch(createKickstarter(kickstarter)),
    updateKickstarter: edition => dispatch(updateKickstarter(edition)),
    deleteKickstarter: id => dispatch(deleteKickstarter(id))
  })
)
class CreateUpdateProjectSupportPage extends Component {
  config = {
    navigationBarTitleText: 'Add Project'
  };

  state = {
    currentEntity: null
  };

  componentDidMount() {
    const { id, type } = this.$router.params;
    if (id && type === 'demand')
      this.props
        .getDemand(id)
        .then(demand => this.setState({ currentEntity: demand }));
    if (id && type === 'kickstarter')
      this.props
        .getKickstarter(id)
        .then(kickstarter => this.setState({ currentEntity: kickstarter }));
  }

  _handleReceiveProject = async(entity) => {
    const { id, type } = this.$router.params;
    if (this.props.isFetching) return;
    if (type === 'demand') {
      id
        ? await this.props.updateDemand(id, entity)
        : await this.props.createDemand(entity);
    } else if (type === 'kickstarter') {
      id
        ? await this.props.updateKickstarter(id, entity)
        : await this.props.createKickstarter(entity);
    }
    event.emit('onUpdate')
    Taro.navigateBack();
  }

  _handleDeleteCategory = async () => {
    const { id, type } = this.$router.params;
    if (type === 'demand') {
      await this.props.deleteDemand(id)
    } else if (type === 'kickstarter') {
      await this.props.deleteKickstarter(id)
    }
    Taro.navigateBack();
  }

  render() {
    // If id exist, then it's editing; else would be creating new
    const { id, type } = this.$router.params;
    const { isFetching } = this.props;
    const { currentEntity } = this.state;
    if (id && !currentEntity) return null;

    return (
      <View className='createUpdateProjectSupportPage'>
        {isFetching && <LoadingIndicator />}
        {/** Notification dropdown */}
        <AtMessage />
        <ProjectForm
          type={type}
          project={id ? currentEntity : null}
          onSubmitProject={this._handleReceiveProject}
          onDeleteProject={this._handleDeleteProject}
        />
      </View>
    );
  }
}

export default CreateUpdateProjectSupportPage;
