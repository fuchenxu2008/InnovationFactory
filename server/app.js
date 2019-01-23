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

server.listen(port, () => {
  console.log(chalk.blue(`[√] 🛰  Server is running on http://localhost:${port}`));
});
