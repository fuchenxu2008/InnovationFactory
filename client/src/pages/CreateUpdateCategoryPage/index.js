import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addCategory, updateCategory, getCategory } from '../../actions/category'
import AdminCategoryForm from '../../components/AdminCategoryForm'

import './index.scss'

@connect(({ event, workshop }) => ({
  currentEventCategory: event.currentEventCategory,
  currentWorkshopCategory: workshop.currentWorkshopCategory,
}), (dispatch) => ({
  addCategory: (category) => dispatch(addCategory(category)),
  updateCategory: (edition) => dispatch(updateCategory(edition)),
  getCategory: ({ id, type }) => dispatch(getCategory({ id, type })),
}))
class CreateUpdateCategoryPage extends Component {
  config = {
    navigationBarTitleText: 'Add Category'
  }

  componentDidMount() {
    const { id, type } = this.$router.params;
    if (id && type) this.props.getCategory({ id, type });
  }

  _handleReceiveCategory = async(category) => {
    const { id, type } = this.$router.params;
    category.type = type;
    id ? await this.props.updateCategory({ id, category })
      : await this.props.addCategory(category)
    Taro.navigateBack();
  }

  render () {
    // If id exist, then it's editing workshop; else would be creating new workshop
    const { id, type } = this.$router.params;
    let currentCategory;
    if (type === 'event') currentCategory = this.props.currentEventCategory;
    if (type === 'workshop') currentCategory = this.props.currentWorkshopCategory;
    if (id && !currentCategory) return null;

    return (
      <View className='createUpdateCategoryPage'>
        {/** Notification dropdown */}
        <AtMessage />
        <AdminCategoryForm
          category={id ? currentCategory : null}
          onSubmitCategory={this._handleReceiveCategory}
        />
      </View>
    )
  }
}

export default CreateUpdateCategoryPage
