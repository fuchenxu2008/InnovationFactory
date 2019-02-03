import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Carousel from '../../components/Carousel'
import EventCard from '../../components/EventCard'
import GradientHeader from '../../components/GradientHeader'
import { getAllEvents } from "../../actions/event";
import getOrdedEvents from '../../selectors/latest_events';

import './index.scss'

@connect(({ event }) => ({
  allEvents: getOrdedEvents(event),
}), (dispatch) => ({
  getAllEvents: () => dispatch(getAllEvents())
}))
class LatestEventPage extends Component {
  config = {
    navigationBarTitleText: '最新活动',
  }

  componentDidMount() { 
    this.props.getAllEvents()
  }

  // (component A & component B) <=======> redux store (state)
  //   => dispatch action (login) =====> reducer 1, 2, 3,...n  reducer4(action) if (action.type === 'user_login')... return { ...state, currentUser: action.payload }   
  //   {
  //     type: 'USER_LOGIN',
  //     payload: user
  //   }

  render () {
    return (
      <View className='latestEventPage'>
        <GradientHeader pageTitle='The latest events' />
        <View className='latestEventPage-carousel'>
          <Carousel />
        </View>
        <View>
          <View className='latestEventPage-eventlist-heading'>
            <View className='latestEventPage-eventlist-title'>活动列表</View>
          </View>
          <ScrollView scrollX scrollWithAnimation>
            <View className='latestEventPage-eventlist'>
              {
                this.props.allEvents.map(event => (
                  <View key={event._id} className='latestEventPage-eventlistitem'>
                    <EventCard event={event} />
                  </View>
                ))
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default LatestEventPage
