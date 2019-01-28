import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addEvent } from '../../actions/event'
import AdminEventForm from '../../components/AdminEventForm'

import './index.scss'

@connect(() => ({}), (dispatch) => ({
  addEvent (event) {
    dispatch(addEvent(event))
  }
}))
class CreateUpdateEventPage extends Component {
  config = {
    navigationBarTitleText: 'Add Event'
  }

  render () {

    return (
      <View className='createUpdateEventPage'>
        {/** Notification dropdown */}
        <AtMessage />
        <AdminEventForm />
      </View>
    )
  }
}

export default CreateUpdateEventPage
