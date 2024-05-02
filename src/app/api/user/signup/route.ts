import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { signJWT } from '@/app/lib/jwt';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/app/lib/cookie';

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json();

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });

    const { password: pw, ...result } = user;

    const { accessToken, refreshToken } = await signJWT(result);
    setAccessTokenCookie(accessToken);
    setRefreshTokenCookie(refreshToken);

    const response = {
      message: '회원가입 성공',
      data: result,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '회원가입 실패' }, { status: 200 });
  }
}
