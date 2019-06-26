import Taro, { Component } from '@tarojs/taro';
import { View, Image, Picker, Text } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtSwitch, AtTextarea, AtIcon, AtFloatLayout } from 'taro-ui'
import dayjs from 'dayjs'
import preset from './preset'
import WxValidate from '../../utils/wxValidate'
import { ROOT_URL } from '../../config'

import './index.scss';

const today = dayjs().format('YYYY-MM-DD');
const typeSet = ['text', 'number', 'password', 'phone', 'idcard', 'digit'];

class AdminActivityForm extends Component {
  state = {
    albumPicPath: '',
    title: '',
    subtitle: '',
    category: null,
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
    if (this.props.activity) this._readActivityToUpdate(this.props.activity);
    this._initValidate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activity) this._readActivityToUpdate(nextProps.activity);
  }

  _readActivityToUpdate = (activity) => {
    const {
      albumPicPath,
      startTime,
      endTime,
      signupFrom,
      signupTo,
    } = activity;

    this.setState((prevState) => ({
      ...prevState,
      ...activity,
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

  _initValidate = () => {
    const rules = {
      albumPicPath: {
        required: true,
      },
      title: {
        required: true,
      },
      subtitle: {
        required: true,
      },
      category: {
        required: true,
      },
      desc: {
        required: true,
      },
      address: {
        required: true,
      },
      linkToArticle: {
        url: true,
      }
    };
    const messages = {
      albumPicPath: {
        required: 'Please upload a cover image',
      },
      title: {
        required: 'Please input title',
      },
      subtitle: {
        required: 'Please input subtitle',
      },
      category: {
        required: 'Please select category',
      },
      desc: {
        required: 'Please input description',
      },
      address: {
        required: 'Please input address',
      },
      linkToArticle: {
        url: 'Please enter a valid URL',
      }
    };
    this.WxValidate = new WxValidate(rules, messages);
  }

  _handleFormSubmit = () => {
    const {
      albumPicPath,
      title,
      subtitle,
      desc,
      category,
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
      formFields,
    } = this.state;

    const activity = {
      albumPicPath,
      title,
      subtitle,
      desc,
      category: (category || {})._id,
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

    if (!this.WxValidate.checkForm(activity)) {
      const error = this.WxValidate.errorList[0];
      return Taro.atMessage({
        message: error.msg,
        type: 'error',
      })
    }
    this.props.onSubmitActivity(activity);
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
  _handleCategoryChange = (e) => this.setState({ category: this.props.availableCategories[e.detail.value] })

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

  _handleToggleSelectmodal = () => this.setState((prevState) => ({ modalOpened: !prevState.modalOpened }))

  _handleAddPreset = (presetField, alreadyExist) => {
    if (alreadyExist) return;
    this._handleToggleSelectmodal();
    this._handleAddFormField(presetField);
  }

  _handleClickNewField = () => {
    this._handleToggleSelectmodal();
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
      category,
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

    const categories = (this.props.availableCategories || []).map(cate => cate.name);

    return (
      <AtForm onSubmit={this._handleFormSubmit}>
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
              onBlur={this._handleInputChange.bind(this, 'title')}
              value={title}
            />
            <AtInput
              title='Subtitle'
              type='text'
              placeholder='Enter a subtitle'
              onChange={this._handleInputChange.bind(this, 'subtitle')}
              onBlur={this._handleInputChange.bind(this, 'subtitle')}
              value={subtitle}
            />
            <View className='picker-section'>
              <View className='picker-title'>Category</View>
              <Picker
                mode='selector'
                range={categories}
                onChange={this._handleCategoryChange}
              >
                <View className='picker-value'>
                  {category ? category.name : 'Please Select'}
                </View>
              </Picker>
            </View>
            <View className='input-title'>Description</View>
            <AtTextarea
              name='description'
              placeholder='Enter a description'
              onChange={this._handleTextareaChange.bind(this, 'desc')}
              onBlur={this._handleTextareaChange.bind(this, 'desc')}
              value={desc}
              maxLength={1000}
            />
          </View>
          <View className='form-body-section-heading'>Detailed Information</View>
          <View className='form-body-section'>
            {/** Activity start & end time */}
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
                onBlur={this._handleInputChange.bind(this, 'address')}
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
              onBlur={this._handleInputChange.bind(this, 'linkToArticle')}
              value={linkToArticle}
            />
          </View>
          <View className='form-body-section-heading'>User Actions</View>
          <View className='form-body-section'>
            {/** Accept Signup switch */}
            <View className='switch-section'>
              <View className='input-title'>Accept SignUp</View>
              <AtSwitch checked={acceptSignup} onChange={this._handleInputChange.bind(this, 'acceptSignup')} border={false} />
            </View>
            {/** Cancellable switch */}
            <View className='switch-section'>
              <View className='input-title'>Cancellable</View>
              <AtSwitch checked={cancellable} onChange={this._handleInputChange.bind(this, 'cancellable')} border={false} />
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
                    <View key={`ticket-${i}`} className='ticket-item'>
                      <AtInput
                        type='text'
                        placeholder='Type'
                        onChange={this._handleTicketChange.bind(this, i, 'ticketType')}
                        onBlur={this._handleTicketChange.bind(this, i, 'ticketType')}
                        value={ticket.ticketType}
                      />
                      <AtInput
                        type='number'
                        placeholder='Fee'
                        onChange={this._handleTicketChange.bind(this, i, 'fee')}
                        onBlur={this._handleTicketChange.bind(this, i, 'fee')}
                        value={ticket.fee}
                      />
                      <AtInput
                        type='number'
                        placeholder='Quota'
                        onChange={this._handleTicketChange.bind(this, i, 'quota')}
                        onBlur={this._handleTicketChange.bind(this, i, 'quota')}
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
                <AtIcon value='add-circle' onClick={this._handleToggleSelectmodal} />
              </View>
              {
                formFields.map((formField, i) => (
                  <View key={`form-${i}`} className='formfield-item'>
                    <View className='formfield-item-input'>
                      <AtInput
                        type='text'
                        title='Field'
                        onChange={this._handleFormFieldChange.bind(this, i, 'field')}
                        onBlur={this._handleFormFieldChange.bind(this, i, 'field')}
                        value={formField.field}
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
                        />
                      </View>
                    </View>
                    <View className='delete-formfield'>
                      <AtIcon value='subtract-circle' onClick={this._handleDeleteFormField.bind(this, i)} color='red' />
                    </View>
                  </View>
                ))
              }
              <AtFloatLayout isOpened={modalOpened} title='Select Preset Form Fields' onClose={this._handleToggleSelectmodal} customStyle={{ display: 'flex' }}>
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

export default AdminActivityForm;
