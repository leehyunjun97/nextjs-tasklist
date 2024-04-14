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
} from '@nextui-org/react';
import { Todo } from '@/types/todo';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState('');

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

  return (
    <>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input
          type='text'
          label='새로운 할일'
          value={newTodoInput}
          onValueChange={(e) => {
            setNewTodoInput(e);
            setTodoAddEnable(e.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button color='warning' className='h-14'>
            추가
          </Button>
        ) : (
          disableTodoAddButton()
        )}
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
    </>
  );
};

export default TodosTable;
