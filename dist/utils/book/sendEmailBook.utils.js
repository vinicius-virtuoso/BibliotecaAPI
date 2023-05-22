"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailBook = void 0;
// src/nodemailer.util.ts
require("dotenv/config");
const nodemailer_1 = require("nodemailer");
const sendEmailBook = async ({ to, username, book }) => {
    const transporter = (0, nodemailer_1.createTransport)({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    await transporter
        .sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: 'The book is available!',
        html: `
      <!DOCTYPE html>
      <html>
      <style>
      strong,span {
        color: #037547;
      }
    </style>
        <h1>Hello ${username}, the book ${book} is available!</h1>
        <p>This email is to let you know that the book ${book} is <span>available</span> for you to borrow!</p>
        <p>So <strong>RUN</strong> and take the opportunity to order the book you are interested in before it becomes unavailable!</p>
      </html>
      `,
    })
        .then(() => {
        console.log('Email send with success');
    })
        .catch((err) => {
        console.log(err);
        throw new Error('Error sending email, try again later');
    });
};
exports.sendEmailBook = sendEmailBook;
