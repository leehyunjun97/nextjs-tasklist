import { serverInstance } from '@/utils/axiosInterceptor';
import { clientInstance } from '@/utils/clientInterceptor';

export const fetchTodosApiCall = async () => {
  try {
    const response = await serverInstance.get('/api/todos/');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoApi = async (title: string) => {
  try {
    await new Promise((f) => setTimeout(f, 500));
    await clientInstance.post('/api/todos/', {
      title,
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
    await new Promise((f) => setTimeout(f, 500));
    await clientInstance.post(`/api/todos/${id}`, {
      title: editedTitle,
      is_done,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoApi = async (id: number) => {
  try {
    await new Promise((f) => setTimeout(f, 500));
    await clientInstance.delete(`/api/todos/${id}`);
  } catch (error) {
    console.log(error);
  }
};
