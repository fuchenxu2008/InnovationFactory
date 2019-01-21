import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Form, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { addEvent } from '../../actions/event'

import './index.scss'

@connect(() => ({}), (dispatch) => ({
  addEvent (event) {
    dispatch(addEvent(event))
  }
}))
class AddEventPage extends Component {

  config = {
    navigationBarTitleText: 'Add Event'
  }

  state = {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  _handleFormSubmit = (e) => {
    console.log(e.detail.value);
    this.props.addEvent(e.detail.value);
    Taro.navigateBack()
  }

  render () {
    // const { editing } = this.state;

    return (
      <View className='eventManagePage'>
        <Form onSubmit={this._handleFormSubmit}>
          <View>
            <View>Title</View>
            <Input name='title' placeholder='Enter a title' />
          </View>
          <View>
            <View>Description</View>
            <Input name='description' placeholder='Enter a description' />
          </View>
          <Button formType='submit'>Create</Button>
        </Form>
      </View>
    )
  }
}

export default AddEventPage
