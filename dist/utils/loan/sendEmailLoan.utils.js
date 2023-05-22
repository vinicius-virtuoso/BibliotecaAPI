"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailLoan = void 0;
// src/nodemailer.util.ts
require("dotenv/config");
const nodemailer_1 = require("nodemailer");
const sendEmailLoan = async ({ to, username }) => {
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
        subject: 'You need to return the BOOKS!',
        html: `
      <!DOCTYPE html>
      <html>
      <style>
      span {
        color: #ff0000;
      }
    </style>
        <h1>Hello ${username}, you haven't returned the borrowed book yet.</h1>
        <p><strong>REMINDER!</strong> It is mandatory to return the books within the specified deadline. If not returned on time, you will not be able to borrow new books.</p>
        <span>Also, if the book is returned after the deadline, you will not be able to borrow new ones for a certain period of time.</span>
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
exports.sendEmailLoan = sendEmailLoan;
