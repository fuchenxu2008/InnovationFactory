import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getAllPrinters } from '../../actions/printer'
// import Carousel from '../../components/Carousel'
// import PopUpModal from '../../components/PopUpModal'
import { ROOT_URL } from '../../config'

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
          // autoplay
        >
        {
          allPrinters.map(printer => (
            <SwiperItem key={printer._id} className='printer-swiper-item'>
              <View className='printer-swiper-item-content'>
                <View className='printer-intro'>
                  <View>{printer.type}</View>
                  <View>{printer.consumables}</View>
                </View>
                <View className='printer-detail'>
                  <View>仪器特点：{`${printer.class}、耗材${printer.consumableCost}`}</View>
                  <View>成品特点：{`尺寸${printer.productSize}；${printer.productCharacter}`}</View>
                  <View>后续处理：{printer.postProcessing}</View>
                  <View>实际应用：{printer.application}</View>
                </View>
                <Image src={`${ROOT_URL}${printer.albumPicPath}`} mode='aspectFill' className='printer-img' />
                <View>
                  
                </View>
              </View>
            </SwiperItem>
          ))
        }
        </Swiper>
      </View>
    )
  }
}

export default BrowsePrinterPage
