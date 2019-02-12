import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtTextarea, AtIcon } from 'taro-ui'
import { ROOT_URL } from '../../config'

import './index.scss';

class AdminCategoryForm extends Component {
  state = {
    name: '',
    desc: '',
    albumPicPath: '', // Banner image path
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
    const { name, desc, albumPicPath } = this.state;

    if (!albumPicPath) return Taro.atMessage({
      'message': 'Must upload a cover image!',
      'type': 'error',
    })
    const category = { name, desc, albumPicPath };
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

  render() {
    const { name, desc, albumPicPath } = this.state;
    
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
            <View className='input-title'>Description</View>
            <AtTextarea
              name='description'
              placeholder='Enter a description'
              onChange={this._handleTextareaChange.bind(this, 'desc')}
              value={desc}
              maxLength={1000}
            />
          </View>
          <AtButton type='primary' formType='submit'>Submit</AtButton>
        </View>
      </AtForm>
    )
  }
}

export default AdminCategoryForm;