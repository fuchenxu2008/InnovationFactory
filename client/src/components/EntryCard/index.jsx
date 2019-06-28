import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import 'animate.css';

import './index.scss';

class EntryCard extends Component {
    render() {
        const { img, titleZH, titleEN, onClick } = this.props;
        return (
            <View className='entrycard' onClick={onClick}>
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
