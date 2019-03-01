import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import EntryCard from '../../components/EntryCard';
import SearchBar from '../../components/SearchBar';

import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '创新工场',
  }

  _handleEnterActivityPage = (type) => {
    Taro.navigateTo({
      url: `/pages/LatestActivityPage/index?type=${type}`
    })
  }

  _handleEnterPrinterPage = () => {
    Taro.navigateTo({
      url: '/pages/BrowsePrinterPage/index'
    })
  }

  _handleEnterSearchPage = () => {
    Taro.navigateTo({
      url: '/pages/SearchPage/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <SearchBar fixed onClick={this._handleEnterSearchPage} />
        <View className='entrycards-section'>          
          <EntryCard
            img={require('../../assets/images/latestEvent.png')}
            titleZH='最新活动'
            titleEN='The latest events'
            onClick={this._handleEnterActivityPage.bind(this, 'event')}
          />
          <EntryCard
            img={require('../../assets/images/workshopBooking.png')}
            titleZH='课程报名'
            titleEN='Apply for workshops'
            onClick={this._handleEnterActivityPage.bind(this, 'workshop')}
          />
          <EntryCard
            img={require('../../assets/images/printerReservation.png')}
            titleZH='仪器预约'
            titleEN='Printer reservation'
            onClick={this._handleEnterPrinterPage}
          />
        </View>
      </View>
    )
  }
}

export default Index
