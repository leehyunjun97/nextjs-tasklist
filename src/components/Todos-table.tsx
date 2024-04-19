'use client';
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
} from '@nextui-org/react';
import { Todo } from '@/types/todo';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  // 할일 input
  const [newTodoInput, setNewTodoInput] = useState('');
  // 로딩
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addTodoHandler = async (title: string) => {
    if (!todoAddEnable) return;
    setTodoAddEnable(false);
    setIsLoading(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'post',
      body: JSON.stringify({
        title,
      }),
      cache: 'no-store',
    });
    router.refresh();
    setIsLoading(false);
    notify('할일이 성공적으로 추가되었습니다!');
    setNewTodoInput('');
  };

  const todoRow = (todo: Todo) => {
    return (
      <TableRow key={todo.id}>
        <TableCell>{todo.id}</TableCell>
        <TableCell>{todo.title}</TableCell>
        <TableCell>{todo.is_done ? '완료' : '미완료'}</TableCell>
        <TableCell>{`${todo.created_at}`}</TableCell>
      </TableRow>
    );
  };
  const disableTodoAddButton = () => {
    return (
      <Popover placement='top' showArrow={true}>
        <PopoverTrigger>
          <Button color='default' className='h-14'>
            추가
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='px-1 py-2'>
            <div className='text-small font-bold'>😂</div>
            <div className='text-tiny'>할일을 입력해주세요</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const notify = (message: string) => toast.success(message);

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <Input
          type='text'
          label='새로운 할일'
          value={newTodoInput}
          onValueChange={(e: any) => {
            setNewTodoInput(e);
            setTodoAddEnable(e.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button
            color='warning'
            className='h-14'
            onPress={async () => {
              await addTodoHandler(newTodoInput);
            }}
          >
            추가
          </Button>
        ) : (
          disableTodoAddButton()
        )}
      </div>
      <div className='h-6'>
        {isLoading && <Spinner color='warning' size='sm' />}
      </div>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일내용</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>생성일</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'보여줄 데이터가 없습니다.'}>
          {todos && todos.map((todo: Todo) => todoRow(todo))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
