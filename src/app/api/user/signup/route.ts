import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { email, name, password } = await request.json();

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await bcrypt.hash(password, 10),
    },
  });

  const { password: pw, ...result } = user;

  const response = {
    message: '회원가입 성공',
    data: result,
  };

  return NextResponse.json(response, { status: 200 });
}
