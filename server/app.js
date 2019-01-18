const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const chalk = require('chalk');

const { port } = require('./config');

server.listen(port, () => {
    console.log(chalk.blue(`[√] 🛰 Server is running on http://localhost:${port}`));
})