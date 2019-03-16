const axios = require('axios');
const readJSON = require('../utils/readJSON');
const { getAccessToken } = require('../utils/cronJobs/getAccessToken');

// eslint-disable-next-line
const sendTemplateMessage = async (templateData, remainingAttempts = 2) => {
  if (remainingAttempts <= 0) return;
  const retry = () => {
    getAccessToken()
      .then(() => {
        console.log('Retrying send notification...');
        sendTemplateMessage(templateData, --remainingAttempts); // eslint-disable-line
      })
      .catch(err => console.log('Error while getting access token', err));
  };
  readJSON('config/accessToken.json')
    .then(({ access_token }) => axios.post(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`, templateData))
    .then(({ data }) => {
      if (data.errcode === 0) console.log('Notification sent!');
      else if (data.errcode === 41028 || data.errcode === 41029) console.log('Invalid formId!');
      // If access_token is not valid, refetch and run again
      else if (data.errcode === 42001 || data.errcode === 40001) throw new Error('Invalid access_token');
    })
    .catch(() => retry());
};

const sendOrderSuccessNotification = ({ order, activity }) => {
  sendTemplateMessage({
    template_id: 'PhaC1oBnNp7U-Tf8cE-C3SSPX0QVgWlnwhYno7cZTBA',
    touser: order.user.openid,
    form_id: order.formId[0],
    page: `/pages/ActivityDetailPage/index?id=${activity._id}`,
    data: {
      keyword1: {
        value: activity.title,
      }, // 服务名称
      keyword2: {
        value: order.created_at, // 支付时间
      },
      keyword3: {
        value: '¥ 0.00', // 订单金额
      },
      keyword4: {
        value: order._id, // 单号
      },
      keyword5: {
        value: activity.startTime, // 开始时间
      },
      keyword6: {
        value: activity.address, // 地点
      },
    },
  });
};

const sendReminder = ({ order, activity }) => {
  sendTemplateMessage({
    touser: order.user.openid,
    template_id: 'YUwJMeOH6uzDpJEIWDKlW47LJrvADsvVQI_tLOtXHl4',
    form_id: order.formId[1],
    page: `/pages/ActivityDetailPage/index?id=${activity._id}`,
    data: {
      keyword1: {
        value: activity.title, // 服务项目
      },
      keyword2: {
        value: order._id, // 订单编号
      },
      keyword3: {
        value: activity.startTime, // 开始时间
      },
      keyword4: {
        value: activity.endTime, // 结束时间
      },
      keyword5: {
        value: activity.address, // 地址
      },
    },
  });
};

module.exports = {
  sendTemplateMessage,
  sendOrderSuccessNotification,
  sendReminder,
};
