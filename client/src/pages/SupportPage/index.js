import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import dayjs from 'dayjs'

import './index.scss';

class SupportPage extends Component {
  config = {
    navigationBarTitleText: '帮助与支持'
  };

  render() {
    const { type } = this.$router.params;
    return (
      <View className='supportPage'>
        {type === 'support' && (
          <View>
            <View className='supportPage-heading'>帮助与支持</View>
            <View>
              <View>如何快速上手「西浦创新工场」小程序？</View>
              <View>
                ○「最新活动」是聚合所有已收录的西交利物浦大学国际创新港活动的地方，“创新探索行”、“创新新体验”、“创新研讨会”三个栏目将这些内容精心挑选并重新组织，您可以直接点击访问IIH各个活动。
              </View>
              <View>
                ○「课程报名」将“慧创工坊”、“青年企业家研修班”、“创新梦工坊”与“对话IGM”承载并归类，您可以按照「栏目」筛选并查看文章内容。「仪器预约」页面呈现创新工场全部3D打印机类型及其功能·，您可以在这里选择合适的时段预约机器、获取协助。
              </View>
              <View>
                ○最后，您可以在「个人中心」查看已经报名的活动、课程以及预约的仪器。
              </View>
              <View>遇到其他问题想要与支持人员沟通？ ○</View>
              <View>
                您可以通过电话、微信或电子邮件（iih@xjtlu.edu.cn）与我们取得联系
              </View>
            </View>
          </View>
        )}
        {type === 'about' && (
          <View>
            <View className='supportPage-heading'>关于我们</View>
            <View>
              西浦国际创新港International Innovation Hub
              (IIH)是成立于2018年，致力成为全球具有影响力与改变性的创新创业教和学、创新创业科研与创新创业社会服务的枢纽。
              西浦国际创新社将结合IIH与产业和社会成为伙伴，共同通过西浦融合式教育(Syntegrative
              Education)培养出具有高度竞争能力的人才、孕育校园内的创新与创业文化和精神、支持西浦融合式教育中的"创新与创业家社区"的建立，让其能在科技发展、工业发展和商业发展的新时代下推动经济发展与面对社会的挑战。
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default SupportPage;
