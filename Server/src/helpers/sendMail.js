require('dotenv').config()
const nodemailer = require('nodemailer');
const sendMail = async ({ email, subject, randomCode  }) => {

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
        to:email, 
        subject: subject,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Xác nhận tài khoản</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #666;
        }
        .code {
            display: inline-block;
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            background-color: #007bff;
            border-radius: 4px;
        }
        .footer {
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
       ${randomCode}
    </div>
</body>
</html>`
    }
    const result = await transporter.sendMail(message);
    return result;
}
module.exports = sendMail;