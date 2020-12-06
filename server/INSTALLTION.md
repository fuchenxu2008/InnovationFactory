# 后端部署

## 安装依赖

1. 安装 Node.js 和 NPM
2. 安装 MongoDB
3. 进入`server`目录，执行`npm install`安装项目依赖
4. 修改`config/db.json`文件来配置数据库连接参数

## 运行程序

1. 执行`npm run start`即可运行调试

## 部署

1. 安装全局 Node.js 的进程管理器`pm2`, 执行`npm i -g pm2`
2. 守护进程启动后端程序`pm2 start app.js -i max --name InnoFact`
3. Nginx 服务器反向代理端口 4896 并配置域名
