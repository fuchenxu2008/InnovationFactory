const axios = require('axios');
const readJSON = require('../middlewares/readJSON');
const { getAccessToken } = require('../middlewares/cronJobs');

// eslint-disable-next-line
const sendTemplateMessage = async ({ touser, template_id, form_id, page, data }) => {
  const { access_token } = await readJSON('../config/accessToken.json');
  axios.post(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`, {
    touser,
    template_id,
    form_id,
    page,
    data,
  })
    .then((res) => {
      // If access_token is not valid, refetch and run again
      if (res.data.errcode !== 0) {
        getAccessToken()
          .then(() => {
            console.log('Retrying send notification...');
            sendTemplateMessage({
              touser,
              template_id,
              form_id,
              page,
              data,
            });
          })
          .catch(err => console.log(err));
      } else console.log('Notification sent!');
    });
};

const sendOrderSuccessNotification = ({ order, activity }) => {
  sendTemplateMessage({
    template_id: 'PhaC1oBnNp7U-Tf8cE-C3SSPX0QVgWlnwhYno7cZTBA',
    touser: order.user,
    form_id: order.formId[0],
    page: `/pages/EventDetailPage/index?id=${activity._id}`,
    data: {
      keyword1: {
        value: activity.title,
      }, // 服务名称
      keyword2: {
        value: order.created_at, // 支付时间
      },
      keyword3: {
        value: '100万', // 订单金额
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
    touser: order.user,
    template_id: 'YUwJMeOH6uzDpJEIWDKlW47LJrvADsvVQI_tLOtXHl4',
    form_id: order.formId[1],
    page: `/pages/EventDetailPage/index?id=${activity._id}`,
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
