import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const check = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return NextResponse.json(check, { status: 200 });
}
