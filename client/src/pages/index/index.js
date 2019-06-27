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

  _handleEnterDemandPage = () => {
    Taro.navigateTo({
      url: '/pages/DemandPage/index'
    })
  }

  _handleEnterKickstarterPage = () => {
    Taro.navigateTo({
      url: '/pages/KickstarterPage/index'
    })
  }

  render () {
    return (
      <View className='index'>
        {
          <SearchBar fixed onClick={this._handleEnterSearchPage} />
        }
        <View className='entrycards-section'>
          <EntryCard
            img={require('../../assets/images/latestEvent.png')}
            titleZH='最新活动'
            titleEN='The latest events'
            onClick={() => this._handleEnterActivityPage('event')}
          />
          <EntryCard
            img={require('../../assets/images/workshopBooking.png')}
            titleZH='课程报名'
            titleEN='Apply for workshops'
            onClick={() => this._handleEnterActivityPage('workshop')}
          />
          <EntryCard
            img={require('../../assets/images/printerReservation.png')}
            titleZH='仪器预约'
            titleEN='Printer reservation'
            onClick={this._handleEnterPrinterPage}
          />
          <EntryCard
            img={require('../../assets/images/printerReservation.png')}
            titleZH='需求市场'
            titleEN='Demand Market'
            onClick={this._handleEnterDemandPage}
          />
          <EntryCard
            img={require('../../assets/images/printerReservation.png')}
            titleZH='一起众筹'
            titleEN='Kickstarter Nest'
            onClick={this._handleEnterKickstarterPage}
          />
        </View>
      </View>
    )
  }
}

export default Index
