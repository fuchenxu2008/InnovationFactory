import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import EntryCard from '../../components/EntryCard';
import SearchBar from '../../components/SearchBar';

import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '创新工场',
  }

  _handleEnterPage = (type) => {
    Taro.navigateTo({
      url: `/pages/LatestActivityPage/index?type=${type}`
    })
  }

  render () {
    return (
      <View className='index'>
        <SearchBar fixed />
        <View className='entrycards-section'>
          <EntryCard
            img={require('../../assets/images/latestEvent.png')}
            titleZH='最新活动'
            titleEN='The latest events'
            onClick={this._handleEnterPage.bind(this, 'event')}
          />
          <EntryCard
            img={require('../../assets/images/workshopBooking.png')}
            titleZH='课程报名'
            titleEN='Apply for workshops'
            onClick={this._handleEnterPage.bind(this, 'workshop')}
          />
          <EntryCard
            img={require('../../assets/images/printerReservation.png')}
            titleZH='仪器预约'
            titleEN='Printer reservation'
            onClick={this._handleEnterPage.bind(this, 'printer')}
          />
        </View>
      </View>
    )
  }
}

export default Index
