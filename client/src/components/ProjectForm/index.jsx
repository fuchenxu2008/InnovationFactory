import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtTextarea, AtIcon } from 'taro-ui'
import WxValidate from '../../utils/wxValidate'
import { ROOT_URL } from '../../config'

import './index.scss';

class ProjectForm extends Component {
  state = {
    title: '',
    description: '',
    albumPicPath: '', // Banner image path
    email: '',
    phone: '',
    targetAmount: 0,
  };

  componentDidMount() {
    if (this.props.project) this._readProjectToUpdate(this.props.project);
    this._initValidate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project) this._readProjectToUpdate(nextProps.project);
  }

  _readProjectToUpdate = project => {
    this.setState(prevState => ({
      ...prevState,
      ...project,
      // To loadable image
      albumPicPath: `${ROOT_URL}${project.albumPicPath}`
    }));
  };

  _initValidate = () => {
    const rules = {
      title: {
        required: true
      },
      description: {
        required: true
      },
      email: {
        required: true
      },
      targetAmount: this.props.type === 'kickstarter'
    };
    const messages = {
      title: {
        required: 'Please input project title'
      },
      description: {
        required: 'Please input project description'
      },
      email: {
        required: 'Please input your contact email'
      },
      targetAmount: {
        required: 'Please input your target amount'
      }
    };
    this.WxValidate = new WxValidate(rules, messages);
  };

  _handleFormSubmit = () => {
    const { title, description, albumPicPath, email, phone, targetAmount } = this.state;
    const project = { title, description, albumPicPath, contact: { email, phone }, targetAmount };
    if (!this.WxValidate.checkForm(this.state)) {
      const error = this.WxValidate.errorList[0];
      return Taro.atMessage({
        message: error.msg,
        type: 'error'
      });
    }
    this.props.onSubmitProject(project);
  };

  _handleUploadImage = () => {
    Taro.chooseImage()
      .then(res => this.setState({ albumPicPath: res.tempFilePaths[0] }))
      .catch(err => console.log(err));
  };

  _handleInputChange = (field, val) => this.setState({ [field]: val });
  _handleTextareaChange = (field, e) =>
    this.setState({ [field]: e.target.value });

  render() {
    const { title, description, albumPicPath, targetAmount, email, phone } = this.state;
    const { type, project, onDeleteProject } = this.props;

    return (
      <AtForm onSubmit={this._handleFormSubmit}>
        {/** Cover image upload */}
        <View className='album-section'>
          <Image src={albumPicPath} className='albumPic' mode='aspectFill' />
          <View onClick={this._handleUploadImage} className='albumPicBtn'>
            <AtIcon
              value='upload'
              customStyle={{
                marginRight: '5px',
                transform: 'translateY(-5rpx)'
              }}
            />
            <View>Upload Image</View>
          </View>
        </View>
        {/** Main form */}
        <View className='form-body'>
          {/** Basic Info */}
          <View className='form-body-section-heading'>Basic Information</View>
          <View className='form-body-section'>
            <AtInput
              title='Project Name'
              type='text'
              placeholder='Enter a project title'
              onChange={this._handleInputChange.bind(this, 'title')}
              onBlur={this._handleInputChange.bind(this, 'title')}
              value={title}
            />
            <View className='input-title'>Description</View>
            <AtTextarea
              name='description'
              placeholder='Enter a description'
              onChange={this._handleTextareaChange.bind(this, 'description')}
              onBlur={this._handleTextareaChange.bind(this, 'description')}
              value={description}
              maxLength={1000}
            />
            {type === 'kickstarter' &&
              <AtInput
                title='Target Amount'
                type='text'
                placeholder='Enter project target amount'
                onChange={this._handleInputChange.bind(this, 'targetAmount')}
                onBlur={this._handleInputChange.bind(this, 'targetAmount')}
                value={targetAmount}
              />
            }
          </View>
          <View className='form-body-section-heading'>Contact Information</View>
          <View className='form-body-section'>
            <AtInput
              title='Email'
              type='text'
              placeholder='Contact Email'
              onChange={this._handleInputChange.bind(this, 'email')}
              onBlur={this._handleInputChange.bind(this, 'email')}
              value={email}
            />
            <AtInput
              title='Phone'
              type='phone'
              placeholder='Contact phone'
              onChange={this._handleInputChange.bind(this, 'phone')}
              onBlur={this._handleInputChange.bind(this, 'phone')}
              value={phone}
            />
          </View>
          <AtButton type='primary' formType='submit'>
            Submit
          </AtButton>
          {project && (
            <AtButton
              type='secondary'
              onClick={onDeleteProject}
              customStyle={{
                margin: '4% 0',
                borderColor: 'red',
                color: 'red'
              }}
            >
              Delete
            </AtButton>
          )}
        </View>
      </AtForm>
    );
  }
}

export default ProjectForm;
