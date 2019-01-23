import Taro from '@tarojs/taro';

export const loadState = () => {
  try {
    const serializedState = Taro.getStorageSync('state');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.log('Load state failed!');
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    Taro.setStorageSync('state', serializedState);
  } catch (err) {
    console.log('Save state failed!');
  }
}