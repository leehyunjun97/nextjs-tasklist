import { deleteTokens } from '@/app/lib/cookie';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  deleteTokens();
  delete axios.defaults.headers.common['Authorization'];
  return NextResponse.redirect(request.url);
}
