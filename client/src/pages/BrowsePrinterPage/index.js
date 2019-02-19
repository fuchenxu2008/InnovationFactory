import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getAllPrinters } from '../../actions/printer'
import PrinterCard from '../../components/PrinterCard'

import './index.scss'

@connect(({ printer }) => ({
  allPrinters: printer.allPrinters,
  currentPrinter: printer.currentPrinter,
}), (dispatch) => ({
  getAllPrinters: () => dispatch(getAllPrinters()),
}))
class BrowsePrinterPage extends Component {
  config = {
    navigationBarTitleText: '3D打印机',
  }

  componentDidMount() { 
    this.props.getAllPrinters();
  }

  render () {
    const { allPrinters } = this.props;
    return (
      <View className='browsePrinterPage'>
        <Swiper
          className='printer-swiper'
          indicatorColor='white'
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
