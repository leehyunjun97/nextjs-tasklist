import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/app/lib/cookie';
import { signJWT } from '@/app/lib/jwt';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...otherUserInfo } = user;

    const { accessToken, refreshToken } = await signJWT(otherUserInfo);
    setAccessTokenCookie(accessToken);
    setRefreshTokenCookie(refreshToken);

    const response = {
      message: '아이디 패스워드 일치',
      data: { ...otherUserInfo },
    };

    return NextResponse.json(response, { status: 200 });
  } else return NextResponse.json(null);
}
