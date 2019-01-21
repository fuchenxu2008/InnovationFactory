// const axios = require('axios');

const adminRouter = require('./adminRoutes');

// const APPID = 'wxdb862090658cbe67';
// const SECRET = '768bd38f02eca17cf805acf659497722';

module.exports = (app) => {
  // app.post('/api/wxlogin', (req, res) => {
  //   const { code } = req.body;
  //   axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`)
  //     .then(sessionRes => console.log(sessionRes.data));
  //   res.send('3');
  // });
  app.use('/api/admin', adminRouter);
};
