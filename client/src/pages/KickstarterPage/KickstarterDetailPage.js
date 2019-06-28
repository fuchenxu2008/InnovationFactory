import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
// import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import createLoadingSelector from '../../selectors/loadingSelector';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getKickstarter } from '../../actions/kickstarter';
import { ROOT_URL } from '../../config';

import './index.scss';

@connect(
  ({ loading }) => ({
    isFetching: createLoadingSelector(['GET_KICKSTARTER'])(loading)
  }),
  dispatch => ({
    getKickstarter: id => dispatch(getKickstarter(id))
  })
)
class KickstarterDetailPage extends Component {
  config = {
    navigationBarTitleText: 'Kickstarter'
  };

  state = {
    kickstarter: null
  };

  componentDidMount() {
    const { id } = this.$router.params;
    this.props
      .getKickstarter(id)
      .then(kickstarter => this.setState({ kickstarter }));
  }

  _zoomIn(idx) {
    const { imgUrls = [] } = this.state.kickstarter || {};
    let imgs = imgUrls.map(img => `${ROOT_URL}${img}`);
    Taro.previewImage({
      current: imgs[idx],
      urls: imgs
    });
  }

  render() {
    const { kickstarter } = this.state;
    if (!kickstarter) return null;

    const { title, description, created_at, contact, imgUrls = [] } = kickstarter;
    return (
      <View className='kickstarterDetailPage'>
        {this.props.isFetching && <LoadingIndicator />}
        <View className='kickstarterDetail'>
          <Swiper className='detail-swiper' indicatorDots autoplay>
            {imgUrls.map((imgUrl, idx) => (
              <SwiperItem key={imgUrl}>
                <Image
                  className='kickstarter-img'
                  src={`${ROOT_URL}${imgUrl}`}
                  mode='aspectFill'
                  onClick={() => this._zoomIn(idx)}
                />
              </SwiperItem>
            ))}
          </Swiper>
          <View className='kickstarterDetail-section'>
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

export default KickstarterDetailPage;
