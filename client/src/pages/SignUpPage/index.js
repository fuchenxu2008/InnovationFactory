import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Button, Form } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getEvent } from '../../actions/event'
import { submitEventOrder } from '../../actions/order'

import './index.scss'

const genderSet = ['男', '女'];

@connect(({ event, global }) => ({
  currentEvent: event.currentEvent,
  currentUser: global.currentUser,
}), (dispatch) => ({
  getEvent: (eventid) => dispatch(getEvent(eventid)),
  submitEventOrder: (eventOrder) => dispatch(submitEventOrder(eventOrder))
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

  formId = []

  componentDidMount() {
    const { id } = this.$router.params;
    if (id) this.props.getEvent(id);
  }

  /**
   * This function will run twice to get two form_id
   */
  _handleFormSubmit = (e) => {
    const newFormId = e.detail.formId;
    if (newFormId === 'the formId is a mock one') return console.log('Stop on test'); // Stop if run on simulator
    this.formId.push(newFormId);
    const { Name, Gender, Age } = this.state;
    if (this.formId.length < 2) return; // Stop if not enough form_id
    const { formFields, _id } = this.props.currentEvent;
    const { openid } = this.props.currentUser || {};
    // Initialize form and loop to add fields
    const form = { Name, Gender, Age };
    const customizedFields = formFields.map(formfield => formfield.field);
    customizedFields.forEach(field => form[field] = this.state[field] || '');
    // Create order object
    const eventOrder = {
      formId: this.formId,
      user: openid,
      event: _id,
      form,
    }
    this.props.submitEventOrder(eventOrder)
      .then(() => Taro.navigateBack())
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
        <Form
          onSubmit={this._handleFormSubmit}
          reportSubmit
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
          <Button formType='submit' className='btn'>
            <Form onSubmit={this._handleFormSubmit} report-submit>
              <Button formType='submit' class='btn'>
                <View className='submit-btn'>提交并支付</View>
              </Button>
            </Form>
          </Button>
        </Form>
      </View>
    )
  }
}

export default SignUpPage
