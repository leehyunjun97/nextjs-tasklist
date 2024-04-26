import { verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken || !(await verifyJwt(accessToken.split(' ')[1]))) {
    return NextResponse.json('No Authorization', { status: 401 });
  }

  const userInfo = await verifyJwt(accessToken.split(' ')[1]);

  const response = {
    message: '유저 확인 정보 전달 성공',
    data: userInfo,
  };

  return NextResponse.json(response, { status: 200 });
}
