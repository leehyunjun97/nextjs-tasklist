import { deleteTokens } from '@/app/lib/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    deleteTokens();

    return NextResponse.json('asdasdasd', { status: 200 });
  } catch (error) {}
}
