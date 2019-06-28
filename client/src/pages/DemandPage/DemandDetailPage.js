import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import { connect } from '@tarojs/redux';
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getDemand, deleteDemand, completeDemand } from '../../actions/demand';
import { ROOT_URL } from '../../config';
import event from '../../utils/event';

import './index.scss';

@connect(
  ({ loading, global }) => ({
    currentUser: global.currentUser,
    isFetching: createLoadingSelector(['GET_DEMAND'])(loading)
  }),
  dispatch => ({
    getDemand: id => dispatch(getDemand(id)),
    deleteDemand: id => dispatch(deleteDemand(id)),
    completeDemand: id => dispatch(completeDemand(id))
  })
)
class DemandDetailPage extends Component {
  config = {
    navigationBarTitleText: 'Demand'
  };

  state = {
    demand: null
  };

  componentDidMount() {
    const { id } = this.$router.params;
    this.props.getDemand(id).then(demand => this.setState({ demand }));
  }

  _zoomIn(idx) {
    const { imgUrls = [] } = this.state.demand || {};
    let imgs = imgUrls.map(img => `${ROOT_URL}${img}`);
    Taro.previewImage({
      current: imgs[idx],
      urls: imgs
    });
  }

  _onDelete = () => {
    const { id } = this.$router.params;
    this.props.deleteDemand(id).then(() => {
      event.emit('onUpdate');
      Taro.navigateBack();
    });
  }

  _onComplete = () => {
    const { id } = this.$router.params;
    this.props.completeDemand(id).then(() => {
      event.emit('onUpdate');
      Taro.navigateBack();
    });
  }

  render() {
    const { currentUser = {} } = this.props;
    const { demand } = this.state;
    if (!demand) return null;

    const { user = {}, title, description, created_at, contact, imgUrls = [] } = demand;
    return (
      <View className='demandDetailPage'>
        {this.props.isFetching && <LoadingIndicator />}
        <View className='demandDetail'>
          {
            imgUrls.length &&
            <Swiper className='detail-swiper' indicatorDots autoplay>
              {imgUrls.map((imgUrl, idx) => (
                <SwiperItem key={imgUrl}>
                  <Image
                    className='demand-img'
                    src={`${ROOT_URL}${imgUrl}`}
                    mode='aspectFill'
                    onClick={() => this._zoomIn(idx)}
                  />
                </SwiperItem>
              ))}
            </Swiper>
          }
          <View className='demandDetail-section'>
            <View className='section-heading'>Title</View>
            <View className='section-content'>{title}</View>
            <View className='section-heading'>Description</View>
            <View className='section-content'>{description}</View>
            <View className='section-heading'>Contact</View>
            <View className='section-content'>
              <View>Email: {contact.email}</View>
              {contact.phone && <View>Phone: {contact.phone}</View>}
            </View>
            <View className='section-heading'>Publish Time</View>
            <View className='section-content'>{created_at}</View>
          </View>
        </View>
        {
          currentUser && currentUser._id === user._id &&
          <View>
            <View className='delete-btn'>
              <AtFab onClick={this._onDelete}>
                <Text className='at-fab__icon at-icon at-icon-trash'></Text>
              </AtFab>
            </View>
            <View className='complete-btn'>
            <AtFab onClick={this._onComplete}>
              <Text className='at-fab__icon at-icon at-icon-check' />
            </AtFab>
          </View>
          </View>
        }
      </View>
    );
  }
}

export default DemandDetailPage;
