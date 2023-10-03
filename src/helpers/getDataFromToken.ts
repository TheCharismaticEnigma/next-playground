// Decipher the TOKEN and extract the user data.

import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Token } from '@/entities/Token';

export default async function getDataFromToken(request: NextRequest) {
  try {
    const encodedTokenString = request.cookies.get('token')?.value || '';

    const decodedTokenData = jwt.verify(
      encodedTokenString,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;

    return decodedTokenData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//
