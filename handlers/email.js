const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

const generateHTML = (fileName, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${fileName}.pug`,
    options
  );
  return juice(html);
};
exports.send = async (options) => {
  const html = generateHTML(options.file, options);
  const text = htmlToText.htmlToText(html);
  let mailOptions = {
    from: "UpTask <no-reply@uptask.com>", // sender address
    to: options.user.email, // list of receivers
    subject: options.subject, // Subject line
    text, // plain text body
    html, // html body
  };

  const sendEmail = util.promisify(transport.sendMail, transport);
  return sendEmail.call(transport, mailOptions);
};
