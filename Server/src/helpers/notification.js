require('dotenv').config();
const nodemailer = require('nodemailer');

const sendReminderEmail = async ({ email, subject, htmlContent }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const message = {
        from: '"Bình An Dược" <BAD@gmail.com>', 
        to: email, 
        subject: subject,
        html: htmlContent
    };

    try {
        const result = await transporter.sendMail(message);
        console.log('Email đã được gửi:', result);
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
    }
};

module.exports = sendReminderEmail;
