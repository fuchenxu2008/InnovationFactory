import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView, Text, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { ROOT_URL } from '../../config'

import './index.scss';

const guideOptions = ['NEED', 'NO NEED'];

class PrinterCard extends Component {
  state = {
    bookDate: null,
    bookPeriod: null,
    guidance: 'NEED',
  }

  _handleDatePickerChange = (e) => {
    const { timeSlot } = this.props.printer || {};
    this.setState({
      bookDate: Object.keys(timeSlot || {})[e.detail.value]
    })
  }

  _handlePeriodPickerChange = (e) => {
    const { timeSlot } = this.props.printer || {};
    const { bookDate } = this.state;
    this.setState({
      bookPeriod: (timeSlot[bookDate] || [])[e.detail.value]
    });
  }

  _handleGuidePickerChange = (e) => this.setState({ guidance: guideOptions[e.detail.value] })

  render() {
    const { printer, index } = this.props;
    if (!printer) return null;
    const { bookDate, bookPeriod, guidance } = this.state;

    return (
      <ScrollView className='printer-swiper-item-content' scrollY>
        <View className='printer-card'>
          <View className='printer-card-header'>
            <View className='printer-intro'>
              <View className='printer-number'>{index + 1}</View>
              <View className='printer-heading'>
                <View className='printer-type'>{printer.type}</View>
                <View className='printer-consumables'>{printer.consumables}</View>
              </View>
            </View>
            <View className='printer-detail'>
              <View><Text className='detail-title'>仪器特点：</Text>{`${printer.class}、耗材${printer.consumableCost}`}</View>
              <View><Text className='detail-title'>成品特点：</Text>{`尺寸${printer.productSize}；${printer.productCharacter}`}</View>
              <View><Text className='detail-title'>后续处理：</Text>{printer.postProcessing}</View>
              <View><Text className='detail-title'>实际应用：</Text>{printer.application}</View>
            </View>
          </View>
          <Image src={`${ROOT_URL}${printer.albumPicPath}`} mode='aspectFit' className='printer-img' />
        </View>
        <View className='printer-booking'>
          <View className='printer-booking-info'>
            <View className='printer-full-name'>{`${printer.type} 3D Printer`}</View>
            <View className='printer-location'>Location: South Campus IR 2F</View>
          </View>
          <View className='printer-booking-timeslot'>
            <View className='picker-group'>
              <Text className='picker-title'>TIME</Text>
              <Picker mode='selector' range={Object.keys(printer.timeSlot)} onChange={this._handleDatePickerChange}>
                <View className='picker-value'>
                  {bookDate ? bookDate : 'Select'}
                  <AtIcon value='chevron-down' color='grey' />
                </View>
              </Picker>
              <Picker mode='selector' range={(printer.timeSlot|| {})[bookDate]} onChange={this._handlePeriodPickerChange}>
                <View className='picker-value'>
                  {bookPeriod ? bookPeriod : 'Select'}
                  <AtIcon value='chevron-down' color='grey' />
                </View>
              </Picker>
            </View>
            <View className='picker-group'>
              <Text className='picker-title'>GUIDANCE</Text>
              <Picker mode='selector' range={guideOptions} onChange={this._handleGuidePickerChange}>
                <View className='picker-value'>
                  {guidance}
                  <AtIcon value='chevron-down' color='grey' />
                </View>
              </Picker>
            </View>
          </View>
          <View className='printer-booking-btn-section'>
            <View className='printer-booking-btn'>
              <AtIcon value='shopping-cart' color='black' size={30} />
              <Text>FREE</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default PrinterCard;