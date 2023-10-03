import getDataFromToken from '@/helpers/getDataFromToken';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout Successful',
      success: true,
    });

    // Clear the token
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return response; // evething above is executed.
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
