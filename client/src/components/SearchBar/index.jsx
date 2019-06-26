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
    const { fixed, onClick, onConfirm } = this.props;
    const { value } = this.state;

    return (
      <View className='searchbar' onClick={onClick}>
        <AtSearchBar
          fixed={fixed}
          value={value}
          onChange={this._handleSearchBarChange}
          // onBlur={this._handleSearchBarChange}
          onConfirm={() => onConfirm(value)}
          onActionClick={() => onConfirm(value)}
        />
      </View>
    )
  }
}

export default SearchBar;
