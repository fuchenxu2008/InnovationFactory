const chalk = require('chalk');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const io = require('socket.io')(server);
const app = require('express')();
const server = require('http').Server(app);

const { port, mongoURL } = require('./config');
const setRouter = require('./routes');
const { accessTokenManager, registerAllReminderTasks } = require('./middlewares/cronJobs');

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

setRouter(app);
accessTokenManager();
registerAllReminderTasks(); // Send reminder to participants

server.listen(port, () => {
  console.log(chalk.blue(`[√] 🛰  Server is running on http://localhost:${port}`));
});


const printers = [
  {
    type: 'FDM',
    consumables: '塑料(ABS/PLA)',
    consumableCost: '低',
    class: '桌面级',
    quantity: 15,
    productSize: '小',
    productCharacter: '打印速度快;精度较低，表面不平滑，单色;成品力学性能较好，可以长期使用',
    postProcessing: '简单打磨',
    application: '广泛',
  },
  {
    type: 'FDM',
    consumables: '塑料(ABS/PLA)',
    consumableCost: '低',
    class: '工业级',
    quantity: 1,
    productSize: '大',
    productCharacter: '打印速度快;精度较低，表面不平滑，单色;成品力学性能较好，可以长期使用',
    postProcessing: '简单打磨',
    application: '广泛',
  },
  {
    type: '3D System',
    consumables: '粉末、色胶',
    consumableCost: '很高',
    quantity: 1,
    productSize: '小',
    productCharacter: '打印速度较快;精度较低，表面不平滑，多色',
    postProcessing: '过胶水放置一段时间',
    application: '工艺品，人像',
  },
  {
    type: 'SLA',
    consumables: '液体光敏树脂',
    consumableCost: '较高',
    class: '点曝光',
    quantity: 1,
    productSize: '大',
    productCharacter: '精度高，表面精细，颜色为白色或透明;成品力学性能较差，强度、刚度、耐热性能有限，成品不适合长期使用',
    postProcessing: '固化箱',
    application: '产品模型制作',
  },
  {
    type: 'DLP',
    consumables: '液体光敏树脂',
    consumableCost: '高',
    class: '面曝光',
    quantity: 1,
    productSize: '小',
    productCharacter: '精度高，表面精细，颜色根据具体的光固化树脂而定',
    postProcessing: '固化箱',
    application: '产品模型制作',
  },
  {
    type: '水晶内雕机',
    consumables: '水晶本体',
    consumableCost: '根据水晶本体而定',
    class: '工艺品级',
    quantity: 1,
    productSize: '根据水晶本体而定',
    productCharacter: '根据水晶本体而定',
    postProcessing: '无',
    application: '工艺品',
  },
];
