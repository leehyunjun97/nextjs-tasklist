import { NextRequest, NextResponse } from 'next/server';
import dummyTodos from '@/data/dummy.json';
import prisma from '@/app/lib/prisma';

// 모든 할일 가져오기
export async function GET(request: NextRequest) {
  const fetchedTodos = await prisma.todos.findMany();

  const response = {
    message: 'todos 가져오기',
    data: fetchedTodos,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 추가
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  const newTodo = await prisma.todos.create({
    data: {
      title,
    },
  });

  const response = {
    message: '할일 추가 성공',
    data: newTodo,
  };

  return NextResponse.json(response, { status: 201 });
}
