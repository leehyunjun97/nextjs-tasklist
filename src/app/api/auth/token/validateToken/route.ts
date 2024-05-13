import { verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    const errorResponse = NextResponse.json({
      message: 'No Authorization',
      status: 401,
    });

    if (!token) return errorResponse;

    let splitToken = token.split(' ')[1];
    if (splitToken.charAt(0) === '=') {
      splitToken = splitToken.slice(1);
    }

    const userInfo = await verifyJwt(splitToken);

    if (!userInfo) return errorResponse;

    return NextResponse.json({ userInfo, status: 201, massage: '유저 있음' });
  } catch (error) {
    // console.log(error);
  }
}
