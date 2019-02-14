import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getAllPrinters } from '../../actions/printer'
// import Carousel from '../../components/Carousel'
// import PopUpModal from '../../components/PopUpModal'

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
      <View className='latestActivityPage'>
        PrinterPage
        {
          allPrinters.map(printer => (
            <View key={printer._id}>
              {printer.type}
            </View>
          ))
        }
      </View>
    )
  }
}

export default BrowsePrinterPage
