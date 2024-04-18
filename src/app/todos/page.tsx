import React from 'react';
import TodosTable from '@/components/Todos-table';

async function fetchTodosApiCall() {
  console.log('fetchTodosApiCall called');
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`, {
    cache: 'no-store',
  });

  return res.json();
}

const TodosPage = async () => {
  const response = await fetchTodosApiCall();

  console.log(response.data);

  return (
    <div className='flex flex-col space-y-8'>
      <h1 className='text-3xl'>Todos</h1>
      <TodosTable todos={response.data ?? []} />
    </div>
  );
};

export default TodosPage;
