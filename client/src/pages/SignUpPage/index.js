import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getEvent } from '../../actions/event'

import './index.scss'

const genderSet = ['男', '女'];

@connect(({ event }) => ({
  currentEvent: event.currentEvent
}), (dispatch) => ({
  getEvent(eventid) {
    dispatch(getEvent(eventid))
  }
}))
class SignUpPage extends Component {
  config = {
    navigationBarTitleText: '活动报名',
  }

  state = {
    Name: '',
    Gender: 'Please Select',
    Age: '',
  }

  componentDidMount() {
    const { id } = this.$router.params;
    if (id) this.props.getEvent(id);
  }

  _handleFormSubmit = () => {
    const { Name, Gender, Age } = this.state;
    const { formFields } = this.props.currentEvent;
    const form = { Name, Gender, Age };
    const customizedFields = formFields.map(formfield => formfield.field);
    customizedFields.forEach(field => form[field] = this.state[field] || '');
    console.log(form);
  }

  _handleInputChange = (field, val) => this.setState({
    [field]: val
  })

  _handleGenderChange = (e) => this.setState({
    Gender: genderSet[e.detail.value]
  })

  render () {
    const { type } = this.$router.params;
    const { currentEvent } = this.props;
    if (!currentEvent) return null;

    const { formFields } = currentEvent;
    const { Name, Gender, Age } = this.state;

    return (
      <View className='signUpPage'>
        <View className='page-title'>Sign Up {type}</View>
        <AtForm
          onSubmit={this._handleFormSubmit}
          reportSubmit
          customStyle={{ padding: 0 }}
        >
          <AtInput
            title='Name'
            type='text'
            value={Name}
            onChange={this._handleInputChange.bind(this, 'Name')}
          />
          <View className='picker-section'>
            <View className='picker-title'>Gender</View>
            <Picker mode='selector' range={genderSet} onChange={this._handleGenderChange}>
              <View className='picker'>
                <View className='picker-value'>{Gender}</View>
              </View>
            </Picker>
          </View>
          <AtInput
            title='Age'
            type='number'
            value={Age}
            onChange={this._handleInputChange.bind(this, 'Age')}
          />
          {
            formFields.map((formfield, i) => (
              <View key={`formfield-${i}`}>
                  <AtInput
                    title={formfield.field}
                    type={formfield.fieldType}
                    value={this.state[formfield.field] || ''}
                    onChange={this._handleInputChange.bind(this, formfield.field)}
                  />
              </View>
            ))
          }
          <AtButton type='primary' formType='submit'>提交并支付</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default SignUpPage
