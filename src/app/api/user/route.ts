import { isVaildToken } from '@/app/lib/token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userInfo = await isVaildToken(request);
  if (!userInfo) return NextResponse.json('No Authorization', { status: 401 });

  const response = {
    message: '유저 확인 정보 전달 성공',
    data: userInfo,
  };

  return NextResponse.json(response, { status: 200 });
}
