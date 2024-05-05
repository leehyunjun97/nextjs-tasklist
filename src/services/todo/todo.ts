import { User } from '@/types/user';
import { serverInstance } from '@/utils/axiosInterceptor';
import { clientInstance } from '@/utils/clientInterceptor';

export const fetchTodosApiCall = async () => {
  try {
    // const res = await fetch(`${process.env.BASE_URL}/api/todos/`, {
    //   method: 'get',
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   cache: 'no-store',
    // });
    // return res.json();
    const response = await serverInstance.get('/api/todos/');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoApi = async (title: string, user: User) => {
  try {
    // await new Promise((f) => setTimeout(f, 500));
    // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
    //   method: 'post',
    //   body: JSON.stringify({
    //     title,
    //     user,
    //   }),
    //   cache: 'no-store',
    // });
    // await privateInstance.post('/api/todos/', {
    //   title,
    //   user,
    // });
    // return response.data.data;

    await clientInstance.post('/api/todos/', {
      title,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const editTodoApi = async (
//   id: number,
//   editedTitle: string,
//   is_done: boolean
// ) => {
//   try {
//     await new Promise((f) => setTimeout(f, 600));
//     await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
//       method: 'post',
//       body: JSON.stringify({
//         title: editedTitle,
//         is_done,
//       }),
//       cache: 'no-store',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteTodoApi = async (id: number) => {
//   try {
//     await new Promise((f) => setTimeout(f, 600));
//     await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
//       method: 'delete',
//       cache: 'no-store',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
