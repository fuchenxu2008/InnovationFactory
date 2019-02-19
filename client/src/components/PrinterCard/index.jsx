import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView, Button, Text, Picker } from '@tarojs/components';
import { ROOT_URL } from '../../config'

import './index.scss';

class PrinterCard extends Component {
  state = {
    bookDate: null,
    bookPeriod: null,
  }

  _handleTimePickerChange = (field, e) => this.setState({
    [field]: e.detail.value
  })

  render() {
    const { printer, index } = this.props;
    const { bookDate, bookPeriod } = this.state;

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
          <Image src={`${ROOT_URL}${printer.albumPicPath}`} mode='widthFix' className='printer-img' />
        </View>
        <View className='printer-booking'>
          <View className='printer-booking-info'>
            <View className='printer-full-name'>{`${printer.type} 3D Printer`}</View>
            <View className='printer-location'>Location: South Campus IR 2F</View>
          </View>
          <View className='printer-booking-timeslot'>
            <View className='time-picker-group'>
                <Picker mode='date' onChange={this._handleTimePickerChange.bind(this, 'bookDate')}>
                  <View className='picker-value'>{bookDate ? bookDate : 'Select'}</View>
                </Picker>
                <Picker mode='time' onChange={this._handleTimePickerChange.bind(this, 'bookPeriod')}>
                  <View className='picker-value'>{bookPeriod ? bookPeriod : 'Select'}</View>
                </Picker>
              </View>
          </View>
          <Button className='printer-booking-btn'>(Book) Under construction</Button>
        </View>
      </ScrollView>
    )
  }
}

export default PrinterCard;