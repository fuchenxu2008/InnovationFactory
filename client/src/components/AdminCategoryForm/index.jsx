import Taro, { Component } from '@tarojs/taro';
import { View, Image, Picker } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtTextarea, AtIcon } from 'taro-ui'
import { ROOT_URL } from '../../config'

import './index.scss';

const typeSet = ['event', 'workshop'];

class AdminCategoryForm extends Component {
  state = {
    name: '',
    desc: '',
    albumPicPath: '', // Banner image path
    type: 'Please Select',
  }

  componentDidMount() {
    if (this.props.category) this._readActivityToUpdate(this.props.category);    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) this._readActivityToUpdate(nextProps.category);
  }

  _readActivityToUpdate = (category) => {
    this.setState((prevState) => ({
      ...prevState,
      ...category,
      // To loadable image
      albumPicPath: `${ROOT_URL}${category.albumPicPath}`,
    }))
  }

  _handleFormSubmit = () => {
    const { name, desc, albumPicPath, type } = this.state;

    if (!albumPicPath) return Taro.atMessage({
      'message': 'Must upload a cover image!',
      'type': 'error',
    })
    const category = { name, desc, albumPicPath, type };
    console.log('category:', category);
    this.props.onSubmitCategory(category);
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
  _handleTypeChange = (e) => this.setState({ type: typeSet[e.detail.value] })

  render() {
    const { name, desc, albumPicPath, type } = this.state;
    
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
              title='Category Name'
              type='text'
              placeholder='Enter a category name'
              onChange={this._handleInputChange.bind(this, 'name')}
              value={name}
            />
            <View className='picker-section'>
              <View className='picker-title'>Type</View>
              <Picker mode='selector' range={typeSet} onChange={this._handleTypeChange}>
                <View className='picker-value'>{type}</View>
              </Picker>
            </View>
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

          </View>
          <AtButton type='primary' formType='submit'>Submit</AtButton>
        </View>
      </AtForm>
    )
  }
}

export default AdminCategoryForm;