import React from 'react';
import TodosTable from '@/components/Todos-table';
import { getAccessToken } from '../lib/cookie';

async function fetchTodosApiCall() {
  const accessToken = getAccessToken();
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  return res.json();
}

const TodosPage = async () => {
  const response = await fetchTodosApiCall();
  return (
    <div className='flex flex-col space-y-8'>
      <h1 className='text-3xl'>Todos</h1>
      <TodosTable todos={response.data ?? []} />
    </div>
  );
};

export default TodosPage;
