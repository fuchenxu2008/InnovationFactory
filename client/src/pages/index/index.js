import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import EntryCard from '../../components/EntryCard';
import SearchBar from '../../components/SearchBar';

import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '创新工场'
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
          />
          <EntryCard
            img={require('../../assets/images/课程报名.png')}
            titleZH='课程报名'
            titleEN='Apply for workshops'
          />
          <EntryCard
            img={require('../../assets/images/仪器预约.png')}
            titleZH='仪器预约'
            titleEN='Printer reservation'
          />
        </View>
      </View>
    )
  }
}

export default Index
