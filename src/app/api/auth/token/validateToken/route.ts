import { verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'No Authorization', status: 401 });
    }

    const userInfo = await verifyJwt(token.split(' ')[1]);
    console.log('유저 확인: ', userInfo);

    if (!userInfo) {
      return NextResponse.json({ message: 'Forbidden', status: 403 });
    }

    return NextResponse.json({ userInfo, status: 201, massage: '유저 있음' });
  } catch (error) {
    // console.log(error);
  }
}
