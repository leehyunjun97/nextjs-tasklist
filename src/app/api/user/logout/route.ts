import { deleteTokens } from '@/app/lib/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  deleteTokens();
  return NextResponse.redirect(new URL('/', request.url));
}
