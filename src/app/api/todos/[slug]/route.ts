import { NextRequest, NextResponse } from 'next/server';

// 할일 단일 조희
export async function GET(
  request: NextRequest,
  // slug <- 폴더 이름이랑 동일 해야됨 ( id, slug )
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('query');

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'

  const response = {
    message: '단일 할일 가져오기 성공',
    data: {
      id: params.slug,
      title: '오늘도 빡코딩',
      is_done: false,
      query,
    },
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 단일 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const response = {
    message: '단일 할일 삭제 성공',
    data: {
      id: params.slug,
      title: '오늘도 빡코딩',
      is_done: false,
    },
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 단일 수정
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editTodo = {
    id: params.slug,
    title,
    is_done,
  };

  const response = {
    message: '단일 할일 수정 성공',
    data: editTodo,
  };
  return NextResponse.json(response, { status: 200 });
}
