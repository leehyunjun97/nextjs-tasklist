import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { isVaildTokenApi } from '@/services/auth/token';

// 모든 할일 가져오기
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization');
    const vaildResult = await isVaildTokenApi(token?.split(' ')[1]);

    if (!vaildResult.userInfo) {
      return NextResponse.json(vaildResult.message, {
        status: vaildResult.status,
      });
    }

    const fetchedTodos = await prisma.todos.findMany({
      // 최신순으로 정렬
      where: {
        authorId: vaildResult.userInfo.id,
      },
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    });

    const response = {
      message: 'todos 가져오기',
      data: { fetchedTodos, userInfo: vaildResult.userInfo },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

// 할일 추가
export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization');
  const vaildResult = await isVaildTokenApi(token?.split(' ')[1]);

  if (!vaildResult.userInfo)
    return NextResponse.json(vaildResult.message, {
      status: vaildResult.status,
    });

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
          id: vaildResult.userInfo.id,
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
