


const nodemailer = require('nodemailer');

const conf = require('../config/smtpConfig.js');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: conf.SMTP_USER,
        pass: conf.SMTP_PASSWORD
    }
});
module.exports = {
    sendMail(to, subject, message) {
        console.log("to: ", transporter);
        const params = {
            from: conf.SMTP_FROM_EMAIl, // Sender address
            to: to,         // List of recipients
            subject: subject, // Subject line
            text: message, // plain text body
        };
        console.log("params: ", params);
        return new Promise((resolve, reject) => {
            transporter.sendMail(params, function (err, info) {
                if (err) {
                    console.log("Error", err)
                } else {
                    console.log("Else==", info);
                }
            });
        });
    }
};