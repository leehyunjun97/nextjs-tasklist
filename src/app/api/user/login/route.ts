import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { signAccessToken, signRefreshToken } from '@/app/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...otherUserInfo } = user;

    const accessToken = signAccessToken(otherUserInfo);
    const refreshToken = signRefreshToken(otherUserInfo);

    // const response = {
    //   message: '아이디 패스워드 일치',
    //   data: { ...otherUserInfo, accessToken, refreshToken },
    // };

    cookies().set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
    });

    cookies().set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    const response = {
      message: '아이디 패스워드 일치',
      data: { ...otherUserInfo },
    };

    return NextResponse.json(response, { status: 200 });
  } else return NextResponse.json(null);
}
