import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addCategory, updateCategory, getCategory } from '../../actions/category'
import AdminCategoryForm from '../../components/AdminCategoryForm'
import LoadingIndicator from '../../components/LoadingIndicator'
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

@connect(({ event, workshop, loading }) => ({
  currentEventCategory: event.currentEventCategory,
  currentWorkshopCategory: workshop.currentWorkshopCategory,
  isFetching: createLoadingSelector(['ADD_EVENT_CATEGORY', 'EDIT_EVENT_CATEGORY', 'GET_EVENT_CATEGORY', 'ADD_WORKSHOP_CATEGORY', 'EDIT_WORKSHOP_CATEGORY', 'GET_WORKSHOP_CATEGORY'])(loading),
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
    if (this.props.isFetching) return;
    const { id, type } = this.$router.params;
    category.type = type;
    id ? await this.props.updateCategory({ id, category })
      : await this.props.addCategory(category)
    Taro.navigateBack();
  }

  render () {
    // If id exist, then it's editing workshop; else would be creating new workshop
    const { id, type } = this.$router.params;
    const { currentEventCategory, currentWorkshopCategory, isFetching } = this.props;
    let currentCategory;
    if (type === 'event') currentCategory = currentEventCategory;
    if (type === 'workshop') currentCategory = currentWorkshopCategory;
    if (id && !currentCategory) return null;

    return (
      <View className='createUpdateCategoryPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
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
