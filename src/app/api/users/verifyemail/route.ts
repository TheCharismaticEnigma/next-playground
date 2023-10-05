import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';

// Verification will happen in Hybrid way (front + back-end)

// This api gets the token and verifies it from the database.

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;

    // Find user w/ same token which isn't verified.
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'User not found',
        },
        { status: 400 }
      );
    }

    // Update and Save the new user details.
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined; // to reset the token and expiry time
    await user.save();

    return NextResponse.json(
      {
        message: 'Email Verified Successfully.',
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
