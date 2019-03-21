const chalk = require('chalk');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const json2xls = require('json2xls');
// const io = require('socket.io')(server);
const app = require('express')();
const server = require('http').Server(app);

const { port, mongoURL } = require('./config');
const routes = require('./routes');
const { accessTokenManager } = require('./utils/cronJobs/getAccessToken');
const { registerAllReminderTasks } = require('./utils/cronJobs/activityReminder');

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
}, () => {
  console.log(chalk.blue(`[√] 🗄  Database is connected at ${mongoURL}`));
});

global.__root = __dirname;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(json2xls.middleware);

// Set default timezone to Asia/Shanghai
moment.tz.setDefault('Asia/Shanghai');
moment.locale('zh-cn', {
  week: {
    dow: 1,
  },
});
app.use('/api', routes);
accessTokenManager();
registerAllReminderTasks(); // Send reminder to participants

server.listen(port, () => {
  console.log(chalk.blue(`[√] 🛰  Server is running on http://localhost:${port}`));
});

const { recurUpdateTimeslots } = require('./utils/cronJobs/updateTimeslots');
// const { generateTimeSlots } = require('./utils/printerDetect');

recurUpdateTimeslots();

// console.log('generateTimeSlots(): ', generateTimeSlots().then(res => console.log(res)));
