import React from 'react';
import TodosTable from '@/components/Todos-table';
import { fetchTodosApiCall } from '@/services/todo/todo';

const TodosPage = async () => {
  const response = await fetchTodosApiCall();

  return (
    <div className='flex flex-col space-y-8'>
      <h1 className='text-3xl'>Todos</h1>

      <TodosTable todos={response?.fetchedTodos ?? []} />
    </div>
  );
};

export default TodosPage;
