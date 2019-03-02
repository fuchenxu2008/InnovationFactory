import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { searchDatabase } from '../../actions/search'
import createLoadingSelector from '../../selectors/loadingSelector'
import SearchBar from '../../components/SearchBar'
import LoadingIndicator from '../../components/LoadingIndicator'
import ActivityCard from '../../components/ActivityCard'

import './index.scss'

@connect(({ loading }) => ({
  isFetching: createLoadingSelector(['SEARCH'])(loading),
}), (dispatch) => ({
  searchDatabase: ({ q, type }) => dispatch(searchDatabase({ q, type })),
}))
class SearchPage extends Component {
  config = {
    navigationBarTitleText: '搜索',
  }

  state = {
    // searchType: '',
    result: {},
  }

  _handleSearchDatabase = async (q) => {
    try {
      const result = await this.props.searchDatabase({ q });
      this.setState({ result });
    } catch (err) {
      console.log('err: ', err);
    }
  }

  _handleClickActivity = (id, type) => {
    Taro.navigateTo({
      url: `/pages/ActivityDetailPage/index?type=${type}&id=${id}`
    })
  }

  render () {
    const { result } = this.state;
    const { isFetching } = this.props;

    return (
      <View className='searchPage'>
        <SearchBar fixed onConfirm={this._handleSearchDatabase} />
        <View className='background' />
        {
          isFetching &&
          <LoadingIndicator />
        }
        <View className='searchresult-section'>
          {
            result.events &&
            <View className='searchresult-type'>
              <View className='searchresult-type-heading'>Events</View>
                {
                  result.events.map(activity => (
                    <View className='searchresult-item' key={activity._id}>
                      <ActivityCard
                        activity={activity}
                        onClick={this._handleClickActivity.bind(this, activity._id, 'event')}
                      />
                    </View>
                  ))
                }
            </View>
          }
          {
            result.workshops &&
            <View className='searchresult-type'>
              <View className='searchresult-type-heading'>Workshops</View>
                {
                  result.workshops.map(activity => (
                    <View className='searchresult-item' key={activity._id}>
                      <ActivityCard
                        activity={activity}
                        onClick={this._handleClickActivity.bind(this, activity._id, 'workshop')}
                      />
                    </View>
                  ))
                }
            </View>
          }
        </View>
      </View>
    )
  }
}

export default SearchPage
