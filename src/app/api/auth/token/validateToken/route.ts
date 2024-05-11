import { verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'No Authorization', status: 401 });
    }

    let splitToken = token.split(' ')[1];
    if (splitToken.charAt(0) === '=') {
      splitToken = splitToken.slice(1);
    }

    const userInfo = await verifyJwt(splitToken);

    console.log('변환된 유저 체크: ', userInfo);

    if (!userInfo) {
      return NextResponse.json({ message: 'Forbidden', status: 403 });
    }

    return NextResponse.json({ userInfo, status: 201, massage: '유저 있음' });
  } catch (error) {
    // console.log(error);
  }
}
