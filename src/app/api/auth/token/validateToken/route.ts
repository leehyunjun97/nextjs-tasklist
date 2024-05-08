import { verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  let response = {
    userInfo: {},
    message: '',
  };

  if (!token) {
    response.message = 'No Authorization';
    return NextResponse.json(response, { status: 401 });
  }

  const userInfo = await verifyJwt(token.split(' ')[1]);

  if (!userInfo) {
    response.message = 'Forbidden';
    return NextResponse.json(response, { status: 403 });
  }

  response.userInfo = userInfo;
  return NextResponse.json(response, { status: 201 });
}
