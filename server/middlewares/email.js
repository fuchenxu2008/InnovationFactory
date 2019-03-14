// const fs = require('fs');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const moment = require('moment-timezone');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: 'postmaster@sandbox967d89a1ad1940dbacf4e96fff73dfdf.mailgun.org',
    pass: '73edffaf634c05e0e946f91d514b6697-de7062c6-e3cfe1c8',
  },
});

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'Innovation Factory',
    link: 'https://www.xjtlu.edu.cn/zh/research/institutes-centres-and-labs/international-innovation-hub/',
    copyright: 'Copyright © 2018 International Innovation Hub. All rights reserved.',
    // Optional product logo
    logo: 'https://ws1.sinaimg.cn/large/006tKfTcgy1g104l8mlocj30e80e8mxf.jpg',
  },
});

module.exports = (recipient, file) => {
  const email = {
    body: {
      name: 'Admin',
      intro: 'Detailed order information is generated as an Excel file attached below.',
      outro: 'If you need help, just reply to this email, I\'d love to help.',
      signature: 'Cheers',
    },
  };

  // Generate an HTML email with the provided contents
  const emailBody = mailGenerator.generate(email);

  // setup email data with unicode symbols
  const mailOptions = {
    from: '⚗️ Innovation Factory <innovationharbour@outlook.com>', // sender address
    to: recipient, // list of receivers
    subject: 'Order Detail Excel', // Subject line
    html: emailBody, // html body
    attachments: [{
      filename: `order-${moment().format('YYYY_MM_DD_HHmmss')}.xlsx`,
      content: file,
      encoding: 'binary',
    }],
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    return console.log('Message sent: %s', info.messageId);
  });
};
