const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined');

const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const testEmail = async () => {
    try {
        console.log('Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'yamen.rock@gmail.com',
            subject: 'BogartFashion Email Test',
            text: 'This is a test email from BogartFashion to verify email configuration.'
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        
    } catch (error) {
        console.log('❌ Email failed to send');
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);
        console.log('Error response:', error.response);
        console.log('Error command:', error.command);
    }
};

testEmail();