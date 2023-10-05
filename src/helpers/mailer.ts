import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

// Generate a hashed token based on the id.
// Find the user by id and update the specific properties.
// Send an email to the user.

export async function sendEmail({ email, userId, emailType }: any) {
  // If id is in bson, must be converted to string.
  const hashedToken = await bcryptjs.hash(userId.toString(), 10);

  try {
    switch (emailType) {
      case 'Verify': {
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
        break;
      }

      case 'Reset': {
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
      }
    }

    // Using mailtrap email service to send emails.
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'avishkar@gmail.com',
      to: email,
      subject: `${emailType} your email`,
      html: `
       <p>
         Click 
         <a href="${
           process.env.DOMAIN
         }/verifyemail?token=${hashedToken}">here</a> to 
         ${emailType === 'Verify' ? 'Verify your email' : 'Reset your password'}
       </p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
