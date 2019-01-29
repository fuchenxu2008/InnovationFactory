import Taro, { Component } from '@tarojs/taro';
import { View, Image, Picker, Text } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtSwitch, AtTextarea, AtIcon, AtFloatLayout } from 'taro-ui'
import dayjs from 'dayjs'
import preset from './preset'
import { ROOT_URL } from '../../config'

import './index.scss';

const today = dayjs().format('YYYY-MM-DD');
const typeSet = ['text', 'number', 'password', 'phone', 'idcard', 'digit'];

class AdminEventForm extends Component {
  state = {
    albumPicPath: '',
    title: '',
    subtitle: '',
    desc: '',
    startDate: today,
    startTime: '00:00',
    endDate: today,
    endTime: '00:00',
    linkToArticle: '',
    acceptSignup: true,
    signupFromDate: today,
    signupFromTime: '00:00',
    signupToDate: today,
    signupToTime: '00:00',
    address: '',
    cancellable: true,
    tickets: [],
    formFields: [],
    // Other state
    modalOpened: false,
  }

  componentDidMount() {
    if (this.props.event) this._readEventToUpdate(this.props.event);    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) this._readEventToUpdate(nextProps.event);
  }

  _readEventToUpdate = (event) => {
    const {
      albumPicPath,
      startTime,
      endTime,
      signupFrom,
      signupTo,
    } = event;

    this.setState((prevState) => ({
      ...prevState,
      ...event,
      // To loadable image
      albumPicPath: `${ROOT_URL}${albumPicPath}`,
      // Split time to picker components
      startDate: startTime.split(' ')[0],
      startTime: startTime.split(' ')[1],
      endDate: endTime.split(' ')[0],
      endTime: endTime.split(' ')[1],
      signupFromDate: signupFrom.split(' ')[0],
      signupFromTime: signupFrom.split(' ')[1],
      signupToDate: signupTo.split(' ')[0],
      signupToTime: signupTo.split(' ')[1],
    }))
  }

  _handleFormSubmit = () => {
    const {
      albumPicPath,
      title,
      subtitle,
      desc,
      startDate,
      startTime,
      endDate,
      endTime,
      linkToArticle,
      signupFromDate,
      signupFromTime,
      signupToDate,
      signupToTime,
      address,
      acceptSignup,
      cancellable,
      tickets,
      formFields
    } = this.state;

    if (!albumPicPath) return Taro.atMessage({
      'message': 'Must upload a cover image!',
      'type': 'error',
    })
    const event = {
      albumPicPath,
      title,
      subtitle,
      desc,
      startTime: `${startDate} ${startTime}`,
      endTime: `${endDate} ${endTime}`,
      signupFrom: `${signupFromDate} ${signupFromTime}`,
      signupTo: `${signupToDate} ${signupToTime}`,
      address,
      linkToArticle,
      acceptSignup,
      cancellable,
      tickets,
      formFields,
    }
    console.log('event:', event);
    this.props.onSubmitEvent(event);
  }

  _handleUploadImage = () => {
    Taro.chooseImage()
      .then(res => {
        console.log(res);
        this.setState({ albumPicPath: res.tempFilePaths[0] })
      })
      .catch((err) => console.log(err))
  }

  _handleInputChange = (field, val) => this.setState({ [field]: val })
  _handleTextareaChange = (field, e) => this.setState({ [field]: e.target.value })
  _handleTimePickerChange = (field, e) => this.setState({ [field]: e.detail.value })
  
  _handleAddTicket = () => this.setState((prevState) => ({
    tickets: prevState.tickets.concat({
      ticketType: '',
      fee: '',
      quota: '',
    })
  }))
  _handleDeleteTicket = (i) => this.setState((prevState) => {
    prevState.tickets.splice(i, 1);
    return { tickets: prevState.tickets }
  })
  _handleTicketChange = (i, field, val) => this.setState((prevState) => {
    const { tickets } = prevState;
    tickets[i] = {
      ...tickets[i],
      [field]: val
    }
    return { tickets }
  })

  _handleOpenSelectModel = () => this.setState({ modalOpened: true })
  _handleCloseSelectModel = () => this.setState({ modalOpened: false })

  _handleAddPreset = (presetField, alreadyExist) => {
    if (alreadyExist) return;
    this._handleCloseSelectModel();
    this._handleAddFormField(presetField);
  }

  _handleClickNewField = () => {
    this._handleCloseSelectModel();
    this._handleAddFormField();
  }

  _handleAddFormField = (formField = { field: '', fieldType: 'text', required: false }) => {
    this.setState((prevState) => ({
      formFields: prevState.formFields.concat(formField)
    }))
  }
  _handleDeleteFormField = (i) => this.setState((prevState) => {
    prevState.formFields.splice(i, 1);
    return { formFields: prevState.formFields }
  })
  _handleFormFieldChange = (i, field, val) => this.setState((prevState) => {
    const { formFields } = prevState;
    formFields[i] = {
      ...formFields[i],
      [field]: val
    }
    return { formFields }
  })
  _handleFormFieldTypeChange = (i, e) => this.setState((prevState) => {
    const { formFields } = prevState;
    formFields[i] = {
      ...formFields[i],
      fieldType: typeSet[e.detail.value]
    }
    return { formFields }
  })

  render() {
    const {
      albumPicPath,
      title,
      subtitle,
      desc,
      startDate,
      startTime,
      endDate,
      endTime,
      signupFromDate,
      signupFromTime,
      signupToDate,
      signupToTime,
      address,
      linkToArticle,
      acceptSignup,
      cancellable,
      tickets,
      formFields,
      modalOpened,
    } = this.state;
    
    return (
      <AtForm onSubmit={this._handleFormSubmit} reportSubmit customStyle={{ padding: 0 }}>
        {/** Cover image upload */}
        <View className='album-section'>
          <Image src={albumPicPath} className='albumPic' mode='aspectFill' />
          <View onClick={this._handleUploadImage} className='albumPicBtn'>
            <AtIcon value='upload' customStyle={{ marginRight: '5px', transform: 'translateY(-5rpx)' }} />
            <View>Upload Image</View>
          </View>
        </View>
        {/** Main form */}
        <View className='form-body'>
          {/** Basic Info */}
          <View className='form-body-section-heading'>Basic Information</View>
          <View className='form-body-section'>
            <AtInput
              title='Title'
              type='text'
              placeholder='Enter a title'
              onChange={this._handleInputChange.bind(this, 'title')}
              value={title}
            />
            <AtInput
              title='Subtitle'
              type='text'
              placeholder='Enter a subtitle'
              onChange={this._handleInputChange.bind(this, 'subtitle')}
              value={subtitle}
            />
            <View className='input-title'>Description</View>
            <AtTextarea
              name='description'
              placeholder='Enter a description'
              onChange={this._handleTextareaChange.bind(this, 'desc')}
              value={desc}
              maxLength={1000}
            />
          </View>
          <View className='form-body-section-heading'>Detailed Information</View> 
          <View className='form-body-section'>
            {/** Event start & end time */}
            <View className='picker-section'>
              <View className='picker-title'>Start Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handleTimePickerChange.bind(this, 'startDate')}>
                  <View className='picker-value'>{startDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handleTimePickerChange.bind(this, 'startTime')}>
                  <View className='picker-value'>{startTime}</View>
                </Picker>
              </View>
            </View>
            <View className='picker-section'>
              <View className='picker-title'>End Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handleTimePickerChange.bind(this, 'endDate')}>
                  <View className='picker-value'>{endDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handleTimePickerChange.bind(this, 'endTime')}>
                  <View className='picker-value'>{endTime}</View>
                </Picker>
              </View>
            </View>
            {/** Address input */}
            <View>
              <AtInput
                name='address'
                title='Address'
                type='text'
                placeholder='Enter an address'
                onChange={this._handleInputChange.bind(this, 'address')}
                value={address}
              />
            </View>
            { /** SignUp start & end time */ }
            <View className='picker-section'>
              <View className='picker-title'>SignUp Start Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handleTimePickerChange.bind(this, 'signupFromDate')}>
                  <View className='picker-value'>{signupFromDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handleTimePickerChange.bind(this, 'signupFromTime')}>
                  <View className='picker-value'>{signupFromTime}</View>
                </Picker>
              </View>
            </View>
            <View className='picker-section'>
              <View className='picker-title'>SignUp End Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handleTimePickerChange.bind(this, 'signupToDate')}>
                  <View className='picker-value'>{signupToDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handleTimePickerChange.bind(this, 'signupToTime')}>
                  <View className='picker-value'>{signupToTime}</View>
                </Picker>
              </View>
            </View>
            {/** linkToArticle */}
            <AtInput
              title='Link'
              type='text'
              placeholder='Enter the link to article'
              onChange={this._handleInputChange.bind(this, 'linkToArticle')}
              value={linkToArticle}
            />
          </View>
          <View className='form-body-section-heading'>User Actions</View> 
          <View className='form-body-section'>
            {/** Accept Signup switch */}
            <View className='switch-section'>
              <View className='input-title'>Accept SignUp</View>
              <AtSwitch checked={acceptSignup} onChange={this._handleInputChange.bind(this, 'acceptSignup')} border={false} customStyle={{ paddingRight: 0 }} />
            </View>
            {/** Cancellable switch */}
            <View className='switch-section'>
              <View className='input-title'>Cancellable</View>
              <AtSwitch checked={cancellable} onChange={this._handleInputChange.bind(this, 'cancellable')} border={false} customStyle={{ paddingRight: 0 }} />
            </View>
            {/** Tickets */}
            <View className='ticket-section'>
              <View className='ticket'>
                <View className='input-title'>Tickets</View>
                <AtIcon value='add-circle' onClick={this._handleAddTicket} />
              </View>
              <View className='ticket-items'>
                {
                  tickets.map((ticket, i) => (
                    <View key={i} className='ticket-item'>
                      <AtInput
                        type='text'
                        placeholder='Type'
                        onChange={this._handleTicketChange.bind(this, i, 'ticketType')}
                        value={ticket.ticketType}
                      />
                      <AtInput
                        type='number'
                        placeholder='Fee'
                        onChange={this._handleTicketChange.bind(this, i, 'fee')}
                        value={ticket.fee}
                      />
                      <AtInput
                        type='number'
                        placeholder='Quota'
                        onChange={this._handleTicketChange.bind(this, i, 'quota')}
                        value={ticket.quota}
                      />
                      <AtIcon value='subtract-circle' onClick={this._handleDeleteTicket.bind(this, i)} color='red' />
                    </View>
                  ))
                }
              </View>
            </View>
            {/** Signup form */}
            <View className='formfield-section'>
              <View className='formfield'>
                <View className='input-title'>Form Fields</View>
                <AtIcon value='add-circle' onClick={this._handleOpenSelectModel} />
              </View>
              {
                formFields.map((formField, i) => (
                  <View key={i} className='formfield-item'>
                    <View className='formfield-item-input'>
                      <AtInput
                        type='text'
                        title='Field'
                        onChange={this._handleFormFieldChange.bind(this, i, 'field')}
                        value={formField.field}
                        customStyle={{ textAlign: 'right' }}
                      />
                      <View className='picker-section'>
                        <View className='picker-title'>Type</View>
                        <Picker mode='selector' range={typeSet} onChange={this._handleFormFieldTypeChange.bind(this, i)}>
                          <View className='picker-value'>{formField.fieldType}</View>
                        </Picker>
                      </View>
                      <View className='switch-section'>
                        <View className='input-title'>Required</View>
                        <AtSwitch
                          border={false}
                          checked={formField.required}
                          onChange={this._handleFormFieldChange.bind(this, i, 'required')}
                          customStyle={{ paddingRight: 0 }}
                        />
                      </View>
                    </View>
                    <View className='delete-formfield'>
                      <AtIcon value='subtract-circle' onClick={this._handleDeleteFormField.bind(this, i)} color='red' />
                    </View>
                  </View>
                ))
              }
              <AtFloatLayout isOpened={modalOpened} title='Select Preset Form Fields' onClose={this._handleCloseSelectModel} customStyle={{ display: 'flex' }}>
                <View className='preset-list'>
                  {
                    preset.map((presetFormField, i) => {
                      const alreadyExist = formFields.filter(exsitingFormField => exsitingFormField.field === presetFormField.field).length > 0
                      return (
                        <View
                          key={`preset-${i}`}
                          className={`${alreadyExist && 'preset-item-selected'} preset-item`}
                          onClick={this._handleAddPreset.bind(this, presetFormField, alreadyExist)}
                        >
                          {presetFormField.field}
                        </View>
                      )
                    })
                  }
                  <View className='preset-item customize-btn' onClick={this._handleClickNewField}>
                    <AtIcon value='add' size='15' color='white' customStyle={{ transform: 'translateY(-1rpx)' }} />
                    <Text>New</Text>
                  </View>
                </View>
              </AtFloatLayout>
            </View>
          </View>
          <AtButton type='primary' formType='submit'>Submit</AtButton>
        </View>
      </AtForm>
    )
  }
}

export default AdminEventForm;