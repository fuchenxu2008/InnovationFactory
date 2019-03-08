import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import 'animate.css'
import { connect } from '@tarojs/redux'
import { getAllPrinters } from '../../actions/printer'
import PrinterCard from '../../components/PrinterCard'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ printer, loading }) => ({
  allPrinters: printer.allPrinters,
  currentPrinter: printer.currentPrinter,
  isFetching: createLoadingSelector(['GET_ALL_PRINTERS'])(loading),
}), (dispatch) => ({
  getAllPrinters: () => dispatch(getAllPrinters()),
}))
class BrowsePrinterPage extends Component {
  config = {
    navigationBarTitleText: '3D打印机',
  }

  state = {
    animatedClass: 'hidden',
  }

  componentDidMount() { 
    this.props.getAllPrinters();
    setTimeout(() => {
      this.setState({ animatedClass: 'fadeInRight' });
      setTimeout(() => {
        this.setState({ animatedClass: 'fadeOutLeft' });
      }, 2000);
    }, 1500);
  }

  render () {
    const { allPrinters, isFetching } = this.props;
    return (
      <View className='browsePrinterPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
        <View className={`at-icon at-icon-chevron-left swipe-hint animated ${this.state.animatedClass}`} />
        <Swiper
          className='printer-swiper'
          indicatorColor='rgb(235, 235, 235)'
          indicatorActiveColor='rgb(141, 92, 243)'
          // circular
          indicatorDots
          // onChange={this._handleSwiperChange}
        >
        {
          allPrinters.map((printer, i) => (
            <SwiperItem key={printer._id} className='printer-swiper-item'>
              <PrinterCard printer={printer} index={i} />
            </SwiperItem>
          ))
        }
        </Swiper>
      </View>
    )
  }
}

export default BrowsePrinterPage
