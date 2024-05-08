import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { isVaildToken } from '@/app/lib/token';

// 모든 할일 가져오기
export async function GET(request: NextRequest) {
  const result = await isVaildToken(request);
  if (!result.userInfo)
    return NextResponse.json(result.message, { status: result.status });

  const fetchedTodos = await prisma.todos.findMany({
    // 최신순으로 정렬
    where: {
      authorId: result.userInfo.id,
    },
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });

  const response = {
    message: 'todos 가져오기',
    data: { fetchedTodos, userInfo: result.userInfo },
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 추가
export async function POST(request: NextRequest) {
  const result = await isVaildToken(request);
  if (!result.userInfo)
    return NextResponse.json(result.message, { status: result.status });

  const { title }: { title: string } = await request.json();

  if (title === undefined) {
    const errMessage = {
      message: 'title이 없습니다',
    };
    return NextResponse.json(errMessage, { status: 422 });
  }

  const newTodo = await prisma.todos.create({
    data: {
      title,
      author: {
        connect: {
          id: result.userInfo.id,
        },
      },
    },
  });

  const response = {
    message: '할일 추가 성공',
    data: newTodo,
  };

  return NextResponse.json(response, { status: 201 });
}
