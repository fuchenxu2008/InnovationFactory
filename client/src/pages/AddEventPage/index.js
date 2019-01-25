import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtSwitch, AtTextarea } from 'taro-ui'
import moment from 'moment';
import { connect } from '@tarojs/redux'
import { addEvent } from '../../actions/event'

import './index.scss'

const today = moment().format('YYYY-MM-DD');

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
    albumPicPath: '',
    title: '',
    desc: '',
    // Start date and time
    startDate: today,
    startTime: '00:00',
    // End date and time
    endDate: today,
    endTime: '00:00',
    // Time window for ticket purchase
    signupFromDate: today,
    signupFromTime: '00:00',
    signupToDate: today,
    signupToTime: '00:00',
    // Address text and coordinate
    addressText: '',
    cancellable: true,
    tickets: [],
  }

  _handleFormSubmit = () => {
    const { albumPicPath, title, desc, startDate, startTime, endDate, endTime, signupFromDate, signupFromTime, signupToDate, signupToTime, addressText, cancellable, tickets } = this.state;
    const event = {
      albumPicPath,
      title,
      desc,
      startTime: `${startDate} ${startTime}`,
      endTime: `${endDate} ${endTime}`,
      signupFrom: `${signupFromDate} ${signupFromTime}`,
      signupTo: `${signupToDate} ${signupToTime}`,
      address: addressText,
      cancellable,
      tickets,
    }
    this.props.addEvent(event);
    Taro.navigateBack();
  }

  _handleUploadImage = () => {
    Taro.chooseImage()
      .then(res => {
        console.log(res);
        this.setState({ albumPicPath: res.tempFilePaths[0] })
      })
  }
  _handleInputChange = (field, val) => this.setState({ [field]: val })
  _handleTextareaChange = (field, e) => this.setState({ [field]: e.target.value })
  _handlePickerChange = (field, e) => this.setState({ [field]: e.detail.value })
  _handleAddTicket = () => this.setState((prevState) => ({
    tickets: prevState.tickets.concat({
      ticketType: '',
      fee: '',
      quota: '',
    })
  }))
  _handleDeleteTicket = (i) => this.setState((prevState) => {
    prevState.tickets.splice(i, 1);
    return {
      tickets: prevState.tickets,
    }
  })
  _handleTicketChange = (i, field, val) => {
    this.setState((prevState) => {
      const { tickets } = prevState;
      tickets[i] = {
        ...tickets[i],
        [field]: val
      }
      return { tickets }
    })
  }

  render () {
    const { albumPicPath, title, desc, startDate, startTime, endDate, endTime, signupFromDate, signupFromTime, signupToDate, signupToTime, addressText, cancellable, tickets } = this.state;

    return (
      <View className='addEventPage'>
        <AtForm onSubmit={this._handleFormSubmit} reportSubmit customStyle={{ padding: '0 40px' }}>
          <View className='albumSection'>
            <Image src={albumPicPath} className='albumPic' mode='scaleToFill' />
            <View onClick={this._handleUploadImage} className='albumPicBtn'>Upload Image</View>
          </View>
          <View>
            <AtInput
              name='title'
              title='Title'
              type='text'
              placeholder='Enter a title'
              onChange={this._handleInputChange.bind(this, 'title')}
              value={title}
            />
          </View>
          <View>
            <View className='input-title'>Description</View>
            <AtTextarea
              name='description'
              placeholder='Enter a description'
              onChange={this._handleTextareaChange.bind(this, 'desc')}
              value={desc}
            />
          </View>
          <View>
            {/** Event start & end time */}
            <View className='picker-section'>
              <View className='picker-title'>Start Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handlePickerChange.bind(this, 'startDate')}>
                  <View className='picker-value'>{startDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handlePickerChange.bind(this, 'startTime')}>
                  <View className='picker-value'>{startTime}</View>
                </Picker>
              </View>
            </View>
            <View className='picker-section'>
              <View className='picker-title'>End Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handlePickerChange.bind(this, 'endDate')}>
                  <View className='picker-value'>{endDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handlePickerChange.bind(this, 'endTime')}>
                  <View className='picker-value'>{endTime}</View>
                </Picker>
              </View>
            </View>
            { /** SignUp start & end time */ }
            <View className='picker-section'>
              <View className='picker-title'>SignUp Start Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handlePickerChange.bind(this, 'signupFromDate')}>
                  <View className='picker-value'>{signupFromDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handlePickerChange.bind(this, 'signupFromTime')}>
                  <View className='picker-value'>{signupFromTime}</View>
                </Picker>
              </View>
            </View>
            <View className='picker-section'>
              <View className='picker-title'>SignUp End Time</View>
              <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handlePickerChange.bind(this, 'signupToDate')}>
                  <View className='picker-value'>{signupToDate}</View>
                </Picker>
                <Picker mode='time' onChange={this._handlePickerChange.bind(this, 'signupToTime')}>
                  <View className='picker-value'>{signupToTime}</View>
                </Picker>
              </View>
            </View>
          </View>
          {/** Address input */}
          <View>
            <AtInput
              name='address'
              title='Address'
              type='text'
              placeholder='Enter an address'
              onChange={this._handleInputChange.bind(this, 'addressText')}
              value={addressText}
            />
            {
              // <Map
              //   latitude='31.2706648155'
              //   longitude='120.7400465012'
              //   style={{ width: '100%', height: '200px' }}
              //   scale='16'
              //   onMarkerTap={this.markerTap}
              //   onControlTap={this.markerTap}
              //   showLocation
              // ></Map>
            }
          </View>
          {/** Cancellable switch */}
          <View>
            <AtSwitch title='Cancellable' checked={cancellable} onChange={this._handleInputChange.bind(this, 'cancellable')} />
          </View>
          {/** Tickets */}
          <View className='picker-section'>
            <View className='input-title'>Tickets</View>
            <View className='at-icon at-icon-add-circle more-icon' onClick={this._handleAddTicket}></View>
          </View>
          {
            tickets.map((ticket, i) => (
              <View key={i} className='picker-section'>
                <AtInput
                  name={`ticket-${i}-type`}
                  type='text'
                  placeholder='Type'
                  onChange={this._handleTicketChange.bind(this, i, 'ticketType')}
                  value={ticket.ticketType}
                />
                <AtInput
                  name={`ticket-${i}-fee`}
                  type='number'
                  placeholder='Fee'
                  onChange={this._handleTicketChange.bind(this, i, 'fee')}
                  value={ticket.fee}
                />
                <AtInput
                  name={`ticket-${i}-quota`}
                  type='number'
                  placeholder='Quota'
                  onChange={this._handleTicketChange.bind(this, i, 'quota')}
                  value={ticket.quota}
                />
                <View
                  className='at-icon at-icon-subtract-circle delete-icon'
                  onClick={this._handleDeleteTicket.bind(this, i)}
                ></View>
              </View>
            ))
          }
          <AtButton formType='submit'>Create</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default AddEventPage
