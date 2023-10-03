// Extracted personal data from the USER TOKEN.g

import getDataFromToken from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenData = await getDataFromToken(request);
    const user = await User.findOne({ _id: tokenData.id }).select(
      '-password -isVerified'
    );

    return NextResponse.json({
      message: 'User Found',
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 400,
      }
    );
  }
}

// Extract the data from token.
// Retrieve the user from the database.
// Return the user via NextResponse.
