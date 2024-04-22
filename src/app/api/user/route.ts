import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { email, name, password } = await request.json();

  console.log('request확인', email, name, password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await bcrypt.hash(password, 10),
    },
  });

  const response = {
    message: '회원가입 성공',
    data: user,
  };

  return NextResponse.json(response, { status: 200 });
}
