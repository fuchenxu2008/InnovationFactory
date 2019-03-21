import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import LoadingIndicator from '../../components/LoadingIndicator'
import { getAllPrinters } from '../../actions/printer';
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ printer, loading }) => ({
  allPrinters: printer.allPrinters,
  isFetching: createLoadingSelector(['GET_ALL_PRINTERS'])(loading),
}), (dispatch) => ({
  getAllPrinters: () => dispatch(getAllPrinters()),
}))
class ManagePrinterPage extends Component {
  config = {
    navigationBarTitleText: 'Admin Printer'
  }

  state = {

  }

  componentDidMount() {
    this.props.getAllPrinters();
  }

  render () {
    const { isFetching } = this.props;

    return (
      <View className='managePrinterPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }

      </View>
    )
  }
}

export default ManagePrinterPage
