import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

connect(); // FIRST SETUP A CONNETION w/ DATABASE.

export async function POST(request: NextRequest) {
  // Check for the user via email.
  // If it doesn't exist, return user doesn't exist.
  // If it does compare the password and hashed pw w/ bcrypt.
  // after password is verified, generate a token w/ jsonwebtoken and send user details.
  // Next response => set cookies.
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        {
          error: 'No such user exists. ',
        },
        { status: 400 }
      );

    // Verify Password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return NextResponse.json(
        {
          error: 'Invalid Password.',
        },
        { status: 400 }
      );

    // Create a Web Token which is encrypted.
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response; // it'll create the cookie.

    //   Send to the USER VIA SECURE COOKIE.
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Some Error Occurred',
      },
      { status: 500 }
    );
  }
}
