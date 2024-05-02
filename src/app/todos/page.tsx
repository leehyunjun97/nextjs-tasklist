import React from 'react';
import TodosTable from '@/components/Todos-table';
import { fetchTodosApiCall } from '@/services/todo/todo';
import { getAccessToken } from '../lib/cookie';

const TodosPage = async () => {
  const accessToken = getAccessToken();
  const response = await fetchTodosApiCall(accessToken);

  return (
    <div className='flex flex-col space-y-8'>
      <h1 className='text-3xl'>Todos</h1>
      <TodosTable
        todos={response.data.fetchedTodos ?? []}
        user={response.data.userInfo ?? {}}
      />
    </div>
  );
};

export default TodosPage;
