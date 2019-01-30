import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import EntryCard from '../../components/EntryCard';
import SearchBar from '../../components/SearchBar';

import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '创新工场',
  }

  _handleEnterPage = (page) => {
    Taro.navigateTo({
      url: `/pages/${page}/index`
    })
  }

  render () {
    return (
      <View className='index'>
        <SearchBar fixed />
        <View className='entrycards-section'>
          <EntryCard
            img={require('../../assets/images/最新活动.png')}
            titleZH='最新活动'
            titleEN='The latest events'
            onClick={this._handleEnterPage.bind(this, 'LatestEventPage')}
          />
          <EntryCard
            img={require('../../assets/images/课程报名.png')}
            titleZH='课程报名'
            titleEN='Apply for workshops'
            onClick={this._handleEnterPage.bind(this, 'LatestEventPage')}
          />
          <EntryCard
            img={require('../../assets/images/仪器预约.png')}
            titleZH='仪器预约'
            titleEN='Printer reservation'
            onClick={this._handleEnterPage.bind(this, 'LatestEventPage')}
          />
        </View>
      </View>
    )
  }
}

export default Index
