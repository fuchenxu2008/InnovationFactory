import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
// import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getDemand } from '../../actions/demand';
import { ROOT_URL } from '../../config';

import './index.scss';

@connect(
  ({ loading }) => ({
    isFetching: createLoadingSelector(['GET_DEMAND'])(loading)
  }),
  dispatch => ({
    getDemand: id => dispatch(getDemand(id))
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

  render() {
    const { demand } = this.state;
    if (!demand) return null;

    const { title, description, created_at, contact, imgUrls = [] } = demand;
    return (
      <View className='demandDetailPage'>
        {this.props.isFetching && <LoadingIndicator />}
        <View className='demandDetail'>
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
      </View>
    );
  }
}

export default DemandDetailPage;
