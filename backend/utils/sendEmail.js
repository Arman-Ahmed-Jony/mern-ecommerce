const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  let transporter = null
  const mailTrapCredentials = {
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_OUTGOING_PORT,
    auth: {
      user: process.env.MAIL_TRAP_MAIL,
      pass: process.env.MAIL_TRAP_PASSWORD
    }
  }
  const productionEamilCredtentials = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_OUTGOING_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    }
  }
  if (process.env.NODE_ENV === "production") {
     transporter = nodemailer.createTransport(productionEamilCredtentials)
  } else { 
     transporter = nodemailer.createTransport(mailTrapCredentials)
  }

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
