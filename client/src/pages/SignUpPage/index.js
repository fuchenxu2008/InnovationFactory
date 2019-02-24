import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Button, Form } from '@tarojs/components'
import { AtInput, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getEvent } from '../../actions/event'
import { getWorkshop } from '../../actions/workshop'
import { submitOrder } from '../../actions/order'
import WxValidate from '../../utils/wxValidate'

import './index.scss'

const genderSet = ['男', '女'];

@connect(({ event, workshop, global }) => ({
  currentEvent: event.currentEvent,
  currentWorkshop: workshop.currentWorkshop,
  currentUser: global.currentUser,
}), (dispatch) => ({
  getEvent: (eventid) => dispatch(getEvent(eventid)),
  getWorkshop: (workshopid) => dispatch(getWorkshop(workshopid)),
  submitOrder: ({order, type}) => dispatch(submitOrder({order, type}))
}))
class SignUpPage extends Component {
  config = {
    navigationBarTitleText: '活动报名',
  }

  state = {
    currentActivity: null,
    form: {
      name: '',
      gender: '',
      age: '',
    }
  }

  formId = []

  componentDidMount() {
    const { id, type } = this.$router.params;
    if (!id) return;
    if (type === 'event')
      this.props.getEvent(id).then(() => {
        if (this.props.currentEvent) {
          this.setState({ currentActivity: this.props.currentEvent });
          this._initValidate(this.props.currentEvent.formFields);
        }
      })
    if (type === 'workshop')
      this.props.getWorkshop(id).then(() => {
        if (this.props.currentWorkshop) {
          this.setState({ currentActivity: this.props.currentWorkshop });
          this._initValidate(this.props.currentWorkshop.formFields);
        }
      })
  }

  _initValidate = (customizedFields) => {
    const formFields = Object.keys(this.state.form).map(field => ({ field, required: true })).concat(customizedFields);
    const rules = formFields.reduce((acc, formfield) => ({
      ...acc,
      [formfield.field]: {
        required: formfield.required
      }
    }), {});
    const messages = formFields.reduce((acc, formfield) => ({
      ...acc,
      [formfield.field]: {
        required: `Please input ${formfield.field}`
      }
    }), {});
    this.WxValidate = new WxValidate(rules, messages);
  }

  /**
   * This function will run twice to get two form_id
   */
  _handleFormSubmit = (e) => {
    const newFormId = e.detail.formId;
    if (newFormId === 'the formId is a mock one') return console.log('Stop on test'); // Stop if run on simulator
    this.formId.push(newFormId);
    const { currentActivity, form } = this.state;
    if (this.formId.length < 2) return; // Stop if not enough form_id
    // Type of order
    const { type } = this.$router.params;
    const { _id } = currentActivity || {};
    const currentUser = this.props.currentUser || {};
    // Initialize form and loop to add fields
    if (!this.WxValidate.checkForm(form)) {
      const error = this.WxValidate.errorList[0];
      return Taro.atMessage({
        message: error.msg,
        type: 'error',
      })
    }
    return console.log(form);
    // Create order object
    const order = {
      formId: this.formId,
      user: currentUser._id,
      [type]: _id, // event or workshop id
      form,
    }
    this.props.submitOrder({order, type})
      .then(() => Taro.navigateBack())
  }

  _handleInputChange = (field, val) => this.setState((prevState) => ({
    form: {
      ...prevState.form,
      [field]: val
    }
  }))

  _handleGenderChange = (e) => this.setState((prevState) => ({
    form: {
      ...prevState.form,
      gender: genderSet[e.detail.value]
    }
  }))

  render () {
    const { type } = this.$router.params;
    const { currentActivity, form } = this.state;
    if (!currentActivity) return null;

    const { formFields } = currentActivity;

    return (
      <View className='signUpPage'>
        <AtMessage />
        <View className='page-title'>Sign Up {type}</View>
        <Form
          onSubmit={this._handleFormSubmit}
          reportSubmit
        >
          <AtInput
            title='Name'
            type='text'
            value={form.name}
            onChange={this._handleInputChange.bind(this, 'name')}
          />
          <View className='picker-section'>
            <View className='picker-title'>Gender</View>
            <Picker mode='selector' range={genderSet} onChange={this._handleGenderChange}>
              <View className='picker'>
                <View className='picker-value'>{form.gender ? form.gender : 'Please Select'}</View>
              </View>
            </Picker>
          </View>
          <AtInput
            title='Age'
            type='number'
            value={form.age}
            onChange={this._handleInputChange.bind(this, 'age')}
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
