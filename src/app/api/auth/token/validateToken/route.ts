import { verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    let { token } = await request.json();

    const errorResponse = NextResponse.json({
      message: 'No Authorization',
      status: 401,
    });

    if (!token) return errorResponse;

    if (token.charAt(0) === '=') {
      token = token.slice(1);
    }

    const userInfo = await verifyJwt(token);

    if (!userInfo) return errorResponse;

    return NextResponse.json({ userInfo, status: 201, massage: '유저 있음' });
  } catch (error) {
    console.log(error);
  }
}
