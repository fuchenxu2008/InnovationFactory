import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';

import './index.scss';

class SearchBar extends Component {
  state = {
    value: ''
  }

  _handleSearchBarChange = (value) => {
    this.setState({ value })
  }

  render() {
    return (
      <View className='searchbar'>
        <AtSearchBar
          fixed={this.props.fixed}
          value={this.state.value}
          onChange={this._handleSearchBarChange}
        />
      </View>
    )
  }
}

export default SearchBar;