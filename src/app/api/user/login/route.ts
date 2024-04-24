import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { signAccessToken } from '@/app/lib/jwt';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...otherUserInfo } = user;

    const aToken = signAccessToken(otherUserInfo);

    const response = {
      message: '로그인 성공',
      data: otherUserInfo,
    };

    return NextResponse.json(response, { status: 200 });
  } else return NextResponse.json(null);
}
