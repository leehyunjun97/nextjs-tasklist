import prisma from '@/app/lib/prisma';
import { isVaildToken } from '@/app/lib/token';
import { NextRequest, NextResponse } from 'next/server';

// 할일 단일 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const result = await isVaildToken(request);
  if (!result.userInfo)
    return NextResponse.json(result.message, { status: result.status });

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
  const result = await isVaildToken(request);
  if (!result.userInfo)
    return NextResponse.json(result.message, { status: result.status });

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
