import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

class PopUpModal extends Component {
  render() {
    return (
      <View className='popUpModal-overlay'>
        <View className='popUpModal'>
          <View className='modal-content'>
            西浦国际创新港致力成为全球具有影响力与改变性的创新创业教和学、 创新创业科研与创新创业社会服务的枢纽。 西浦国际创新港将与产业和社会成为伙伴， 共同通过西浦融合式教育(Syntegrative Education)[SE] 培养出具有高度竞争能力的人才，让其能在科技发展、工业发展和商业发展的新时代下推动经济发展与面对社会的挑战。
          </View>
          <View className='modal-button' onClick={this.props.onClose}>
            浏览最新活动
          </View>
        </View>
      </View>
    )
  }
}

export default PopUpModal;