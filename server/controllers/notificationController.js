const axios = require('axios');
const { access_token } = require('../config');

// eslint-disable-next-line
const sendTemplateMessage = ({ touser, template_id, form_id, page, data }) => {
  return axios.post(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`, {
    touser,
    template_id,
    form_id,
    page,
    data,
  });
};

module.exports = {
  sendTemplateMessage,
};
