import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Button, Form } from '@tarojs/components'
import { AtInput, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getEvent } from '../../actions/event'
import { getWorkshop } from '../../actions/workshop'
import { getPrinter } from '../../actions/printer'
import { submitOrder } from '../../actions/order'
import createLoadingSelector from '../../selectors/loadingSelector'
import LoadingIndicator from '../../components/LoadingIndicator'
import WxValidate from '../../utils/wxValidate'

import './index.scss'

const genderSet = ['男', '女'];

@connect(({ event, workshop, printer, global, loading }) => ({
  currentEvent: event.currentEvent,
  currentWorkshop: workshop.currentWorkshop,
  currentPrinter: printer.currentPrinter,
  currentUser: global.currentUser,
  isFetching: createLoadingSelector(['GET_EVENT', 'GET_WORKSHOP', 'GET_PRINTER', 'SUBMIT_ORDER'])(loading),
}), (dispatch) => ({
  getEvent: (eventid) => dispatch(getEvent(eventid)),
  getWorkshop: (workshopid) => dispatch(getWorkshop(workshopid)),
  getPrinter: (printerId) => dispatch(getPrinter(printerId)),
  submitOrder: ({order, type}) => dispatch(submitOrder({order, type}))
}))
class SignUpPage extends Component {
  config = {
    navigationBarTitleText: '活动报名',
  }

  state = {
    currentItem: null,
    form: {
      name: '',
      gender: '',
      age: '',
    }
  }

  formId = []

  componentDidMount = () => {
    this._updateCurrentItem(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._updateCurrentItem(nextProps, false);
  }

  _updateCurrentItem = (props, isInitial) => {
    const { type, id } = this.$router.params;
    let currentItem;
    const { currentEvent, currentWorkshop, currentPrinter } = props;
    switch (type) {
      case 'event':
        if (isInitial) this.props.getEvent(id);
        currentItem = currentEvent;
        break;
      case 'workshop':
        if (isInitial) this.props.getWorkshop(id);
        currentItem = currentWorkshop;
        break;
      case 'printer':
        if (isInitial) this.props.getPrinter(id);
        currentItem = currentPrinter;
        break;
    }
    if (!currentItem) return;
    this.setState({ currentItem });
    this._initValidate(currentItem.formFields || []);
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
    if (this.props.isFetching) return;
    const newFormId = e.detail.formId;
    // if (newFormId === 'the formId is a mock one') return console.log('Stop on test'); // Stop if run on simulator
    this.formId.push(newFormId);
    if (this.formId.length < 2) return; // Stop if not enough form_id
    // Type of order
    const { type, bookInfo } = this.$router.params;
    const { currentItem, form } = this.state;
    const currentUser = this.props.currentUser || {};
    // Initialize form and loop to add fields
    if (!this.WxValidate.checkForm(form)) {
      const error = this.WxValidate.errorList[0];
      return Taro.atMessage({
        message: error.msg,
        type: 'error',
      })
    }
    // Create order object
    const order = {
      formId: this.formId,
      user: currentUser._id,
      [type]: (currentItem || {})._id, // event or workshop id
      form,
      ...JSON.parse(bookInfo || '{}'), // Add timeslot/guidance info
    }
    this.formId = [];
    this.props.submitOrder({ order, type })
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
    const { type, id } = this.$router.params;
    const { currentItem, form } = this.state;
    if (!id || !currentItem) return null;

    const formFields = currentItem.formFields || [];

    return (
      <View className='signUpPage'>
        {
          this.props.isFetching &&
          <LoadingIndicator />
        }
        <AtMessage />
        <View className='page-title'>Sign Up {type}</View>
        <View>{currentItem._id}</View>
        <Form
          onSubmit={this._handleFormSubmit}
          reportSubmit
        >
          <AtInput
            title='Name'
            type='text'
            value={form.name}
            onChange={this._handleInputChange.bind(this, 'name')}
            onBlur={this._handleInputChange.bind(this, 'name')}
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
            onBlur={this._handleInputChange.bind(this, 'age')}
          />
          {
            formFields.map((formfield, i) => (
              <View key={`formfield-${i}`}>
                  <AtInput
                    title={formfield.field}
                    type={formfield.fieldType}
                    value={this.state[formfield.field] || ''}
                    onChange={this._handleInputChange.bind(this, formfield.field)}
                    onBlur={this._handleInputChange.bind(this, formfield.field)}
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
