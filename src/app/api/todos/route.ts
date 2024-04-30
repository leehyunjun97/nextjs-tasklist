import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyJwt } from '@/app/lib/jwt';

// 모든 할일 가져오기
export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken || !(await verifyJwt(accessToken.split(' ')[1]))) {
    return NextResponse.json('No Authorization', { status: 401 });
  }

  // 난중에 물어볼거
  const userInfo = await verifyJwt(accessToken.split(' ')[1]);

  if (!userInfo) return;

  const fetchedTodos = await prisma.todos.findMany({
    // 최신순으로 정렬
    where: {
      authorId: userInfo.id,
    },
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });

  console.log('todolist: ', fetchedTodos);

  const response = {
    message: 'todos 가져오기',
    data: fetchedTodos,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 추가
export async function POST(request: NextRequest) {
  const { title, user } = await request.json();

  if (title === undefined) {
    const errMessage = {
      message: 'title이 없습니다',
    };
    return NextResponse.json(errMessage, { status: 422 });
  }

  const newTodo = await prisma.todos.create({
    data: {
      title,
      author: user,
      authorId: user.id,
    },
  });

  const response = {
    message: '할일 추가 성공',
    data: newTodo,
  };

  return NextResponse.json(response, { status: 201 });
}
