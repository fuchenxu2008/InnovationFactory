import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
// import { connect } from '@tarojs/redux'

import './index.scss'

const genderSet = ['男', '女'];

class SignUpPage extends Component {
  config = {
    navigationBarTitleText: '活动报名',
  }

  state = {
    name: '',
    gender: '',
    age: '',
    phone: '',
    studentId: '',
  }

  _handleFormSubmit = () => {
    console.log(this.state);
  }

  _handleInputChange = (field, val) => this.setState({
    [field]: val
  })

  _handleGenderChange = (field, e) => this.setState({
    [field]: genderSet[e.detail.value]
  })

  render () {
    const { name, gender, age, phone, studentId } = this.state;
    return (
      <View className='signUpPage'>
        <AtForm
          onSubmit={this._handleFormSubmit}
        >
          <AtInput
            name='姓名'
            title='姓名'
            type='text'
            value={name}
            onChange={this._handleInputChange.bind(this, 'name')}
          />
          <Picker mode='selector' range={genderSet} onChange={this._handleGenderChange.bind(this, 'gender')}>
            <View className='picker'>
              性别 {gender}
            </View>
          </Picker>
          <AtInput
            name='年龄'
            title='年龄'
            type='text'
            value={age}
            onChange={this._handleInputChange.bind(this, 'age')}
          />
          <AtInput
            name='手机号'
            title='手机号'
            type='number'
            value={phone}
            onChange={this._handleInputChange.bind(this, 'phone')}
          />
          <AtInput
            name='学号'
            title='学号'
            type='number'
            value={studentId}
            onChange={this._handleInputChange.bind(this, 'studentId')}
          />
          <AtButton formType='submit'>提交并支付</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default SignUpPage
