import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView, Text, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { ROOT_URL } from '../../config'
import checkLogin from '../../utils/checkLogin'

import './index.scss';

const guideOptions = ['NEED', 'NO NEED'];

@connect(({ global }) => ({
  currentUser: global.currentUser,
}))
class PrinterCard extends Component {
  state = {
    timeSlot: [],
    multiArray: [[], []], // 2维数组数据
    multiIndex: [0, 0], // 默认的下标
    pickerStep: 0,
    guidance: 'NEED',
  }

  componentDidMount() {
    const { timeSlot } = this.props.printer || {}; // assume only date
    if (timeSlot) this._getDate(timeSlot);
  }

  componentWillReceiveProps(nextProps) {
    const { timeSlot } = this.props.printer || {}; // assume only date
    const { timeSlot: newTimeSlot } = nextProps.printer || {};
    if (newTimeSlot !== timeSlot) this._getDate(newTimeSlot);
  }

  _getDate = (timeSlot) => {
    const dateArr = (timeSlot.map(({ date }) => date)).sort((a, b) => new Date(a) - new Date(b));
    this.setState({
      timeSlot,
      multiArray: [dateArr, []], // 更新三维数组
      currentPickedDate: dateArr[0] || '',
    }, () => {
      if (dateArr.length) this._getTime(dateArr[0]);
    })
  }

  _getTime = (currentDate) => {
    const { timeSlot } = this.state;
    const { hours } = timeSlot.find(({ date }) => date === currentDate) || {};
    this.setState((prevState) => ({
      multiArray: [prevState.multiArray[0], hours || []], // 更新三维数组
      currentPickedDate: currentDate,
    }))
  }

  _handlePickerColumnChange = (e) => {
    const { column, value } = e.detail;
    if (column === 0) { // 第一列更改 就是date的更改
      const currentPickedDate = this.state.multiArray[0][value];
      if (currentPickedDate != this.state.currentPickedDate) { // 判断当前的key是不是真正的更新了
        this._getTime(currentPickedDate) // 获取当前key下面的time数据
      }
    }
    this.setState((prevState) => ({
      multiIndex: Object.assign([], prevState.multiIndex, { [column]: value, 1: 0 }),
    }));
  }

  _handleTimePickerChange = (e) => {
    this.setState({
      pickerStep: 1,
      multiIndex: e.detail.value, // 直接更新即可
    })
  }

  _handleGuidePickerChange = (e) => this.setState({ guidance: guideOptions[e.detail.value] })

  _handleConfirmBooking = () => {
    if (!checkLogin(this.props.currentUser)) return;
    const { _id } = this.props.printer || {};
    const { multiIndex, multiArray, guidance, pickerStep } = this.state;
    if (!multiArray[1][multiIndex[1]] || pickerStep === 0) return;
    const bookInfo = {
      timeSlot: `${multiArray[0][multiIndex[0]]} ${multiArray[1][multiIndex[1]]}`,
      guidance: guidance,
    };
    Taro.navigateTo({
      url: `/pages/SignUpPage/index?type=printer&id=${_id}&bookInfo=${JSON.stringify(bookInfo)}`
    })
  }

  render() {
    const { printer, index } = this.props;
    if (!printer) return null;
    const { multiArray, multiIndex, pickerStep, guidance } = this.state;
    const dateSelected = multiArray[0][multiIndex[0]];
    const hourSelected = multiArray[1][multiIndex[1]];
    const isTimeSelected = (hourSelected && pickerStep === 1);

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
          {
            ROOT_URL && printer.albumPicPath &&
            <Image src={`${ROOT_URL}${printer.albumPicPath}`} mode='aspectFit' className='printer-img' />
          }
        </View>
        <View className='printer-booking'>
          <View className='printer-booking-info'>
            <View className='printer-full-name'>{`${printer.type} 3D Printer`}</View>
            <View className='printer-location'>Location: South Campus IR 2F</View>
          </View>
          <View className='printer-booking-timeslot'>
            <View className='picker-group'>
              <Text className='picker-title'>TIME</Text>
              <Picker mode='multiSelector' range={multiArray} onColumnchange={this._handlePickerColumnChange} value={multiIndex} onChange={this._handleTimePickerChange}>
                <View style={{ display: 'flex' }}>
                  {
                    !isTimeSelected
                    ? (
                      <Text>Please Select</Text>
                    )
                    : (
                      <View className='picker-value-group'>
                        <Text>{dateSelected}</Text>
                        <Text>{hourSelected}</Text>
                      </View>
                    )
                  }
                  <AtIcon value='chevron-down' color='grey' />
                </View>
              </Picker>
            </View>
            <View className='picker-group'>
              <Text className='picker-title'>GUIDANCE</Text>
              <Picker mode='selector' range={guideOptions} onChange={this._handleGuidePickerChange}>
                <View>
                  {guidance}
                  <AtIcon value='chevron-down' color='grey' />
                </View>
              </Picker>
            </View>
          </View>
          <View className={`printer-booking-btn ${!isTimeSelected && 'disabled'}`} onClick={this._handleConfirmBooking}>
            <AtIcon value='shopping-cart' color={`${isTimeSelected ? 'black' : 'grey'}`} size={30} />
            <Text>Confirm Booking Info</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default PrinterCard;
