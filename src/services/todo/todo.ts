import { User } from '@/types/user';

export const fetchTodosApiCall = async (accessToken: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/todos/`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const addTodoApi = async (title: string, user: User) => {
  try {
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'post',
      body: JSON.stringify({
        title,
        user,
      }),
      cache: 'no-store',
    });
  } catch (error) {
    console.log(error);
  }
};

export const editTodoApi = async (
  id: number,
  editedTitle: string,
  is_done: boolean
) => {
  try {
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: 'post',
      body: JSON.stringify({
        title: editedTitle,
        is_done,
      }),
      cache: 'no-store',
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoApi = async (id: number) => {
  try {
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: 'delete',
      cache: 'no-store',
    });
  } catch (error) {
    console.log(error);
  }
};
