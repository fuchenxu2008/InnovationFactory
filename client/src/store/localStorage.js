import Taro from '@tarojs/taro';
import compareVersion from '../utils/compareVersion';
import { VERSION_CODE, SHOULD_CLEAN_UNDER } from '../config';

/**
 * Keep track of current version and clean storage if necessary
 */
export const mayVersionAndClean = () => {
  try {
    const version = Taro.getStorageSync('version');
    if (compareVersion((version || '0'), VERSION_CODE) === 0) return;
    if (compareVersion((version || '0'), SHOULD_CLEAN_UNDER) <= 0) {
      console.log('Cleaning storage...');
      Taro.clearStorageSync();
    }
    Taro.setStorageSync('version', VERSION_CODE);
  } catch (error) {
    console.log('Clean storage failed!');
  }
}

export const loadState = () => {
  try {
    mayVersionAndClean();
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