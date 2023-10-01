import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel.js';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';

connect(); // Establish a connection w/ MongoDB Database.

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: 'User already exists.',
        },
        { status: 400 }
      );
    }

    // Hash the PW w/ bcryptjs. Generate Salt and Hash asynchronously.

    const salt = await bcryptjs.genSalt(10); // salt w/ 10 rounds.
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: 'User Created Successfully',
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
