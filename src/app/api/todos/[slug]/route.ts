import { verifyJwt } from '@/app/lib/jwt';
import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 할일 단일 조희
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const fetchedTodo = await prisma.todos.findFirst({
    where: {
      id: Number(params.slug),
    },
  });

  if (fetchedTodo === null) return new Response(null, { status: 204 });

  const response = {
    message: '단일 할일 가져오기 성공',
    data: fetchedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할일 단일 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken || !(await verifyJwt(accessToken.split(' ')[1]))) {
    return NextResponse.json('No Authorization', { status: 401 });
  }

  const userInfo = await verifyJwt(accessToken.split(' ')[1]);

  if (!userInfo) return;

  const deleteTodo = await prisma.todos.delete({
    where: {
      id: Number(params.slug),
    },
  });

  if (deleteTodo === undefined) return new Response(null, { status: 204 });

  const response = {
    message: '단일 할일 삭제 성공',
    data: deleteTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 단일 수정
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken || !(await verifyJwt(accessToken.split(' ')[1]))) {
    return NextResponse.json('No Authorization', { status: 401 });
  }

  const userInfo = await verifyJwt(accessToken.split(' ')[1]);

  if (!userInfo) return;

  const { title, is_done } = await request.json();

  const editTodo = await prisma.todos.update({
    where: {
      id: Number(params.slug),
    },
    data: {
      title,
      is_done,
    },
  });

  if (editTodo === undefined) return new Response(null, { status: 204 });

  const response = {
    message: '단일 할일 수정 성공',
    data: editTodo,
  };
  return NextResponse.json(response, { status: 200 });
}
