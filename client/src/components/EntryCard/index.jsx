import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.scss';

class EntryCard extends Component {
    render() {
        const { img, titleZH, titleEN } = this.props;
        return (
            <View className='entrycard'>
                <Image src={img} className='entrycard-img' mode='widthFix' />
                <View className='entrycard-brand'>INNOVATION FACTORY</View>
                <View className='entrycard-title'>
                    <View className='entrycard-titleZH'>{titleZH}</View>
                    <View className='entrycard-titleEN'>{titleEN}</View>
                </View>
            </View>
        )
    }
}

export default EntryCard;