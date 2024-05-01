'use client';
import React, { Key, useState } from 'react';
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { CustomModalType, FocusedTodoType, Todo } from '@/types/todo';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import CustomModal from './CustomModal';
import { User } from '@/types/user';

const TodosTable = ({ todos, user }: { todos: Todo[]; user: User }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  // 할일 input
  const [newTodoInput, setNewTodoInput] = useState('');
  // 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 띄우는 모달 상태
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: 'detail',
  });

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
        user,
      }),
      cache: 'no-store',
    });
    router.refresh();
    setIsLoading(false);
    notify('할일이 성공적으로 추가되었습니다!');
    setNewTodoInput('');
  };

  const editTodoHandler = async (
    id: number,
    editedTitle: string,
    is_done: boolean
  ) => {
    setIsLoading(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: 'post',
      body: JSON.stringify({
        title: editedTitle,
        is_done,
      }),
      cache: 'no-store',
    });
    router.refresh();
    setIsLoading(false);
    notify('할일이 성공적으로 수정되었습니다!');
  };

  const deleteTodoHandler = async (id: number) => {
    setIsLoading(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: 'delete',
      cache: 'no-store',
    });
    router.refresh();
    setIsLoading(false);
    notify('할일이 성공적으로 삭제되었습니다!');
  };

  const logoutHandler = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/logout`);
    router.push('/');
  };

  const applyIsDoneUI = (is_done: boolean) =>
    is_done ? 'line-through text-white/50' : '';

  const todoRow = (todo: Todo) => {
    return (
      <TableRow key={todo.id}>
        <TableCell className={applyIsDoneUI(todo.is_done)}>{todo.id}</TableCell>
        <TableCell className={applyIsDoneUI(todo.is_done)}>
          {todo.title}
        </TableCell>
        <TableCell className={applyIsDoneUI(todo.is_done)}>
          {todo.is_done ? '완료' : '미완료'}
        </TableCell>
        <TableCell
          className={applyIsDoneUI(todo.is_done)}
        >{`${todo.created_at}`}</TableCell>
        <TableCell>
          {' '}
          <div className='relative flex justify-end items-center gap-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key: Key) => {
                  setCurrentModalData({
                    focusedTodo: todo,
                    modalType: key as CustomModalType,
                  });
                  onOpen();
                }}
              >
                <DropdownItem key='detail'>상세보기</DropdownItem>
                <DropdownItem key='update'>수정</DropdownItem>
                <DropdownItem key='delete'>삭제</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </TableCell>
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ModalComponent = () => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose: any) =>
            currentModalData.focusedTodo && (
              <CustomModal
                focusedTodo={currentModalData.focusedTodo}
                modalType={currentModalData.modalType}
                onClose={onClose}
                onEdit={async (id, title, isDone) => {
                  await editTodoHandler(id, title, isDone);
                  onClose();
                }}
                onDelete={async (id) => {
                  await deleteTodoHandler(id);
                  onClose();
                }}
              />
            )
          }
        </ModalContent>
      </Modal>
    );
  };

  return (
    <div className='flex flex-col space-y-2 relative'>
      {ModalComponent()}
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
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'보여줄 데이터가 없습니다.'}>
          {todos && todos.map((todo: Todo) => todoRow(todo))}
        </TableBody>
      </Table>
      <div className='h-8'>
        <Button
          onClick={logoutHandler}
          className='absolute right-1 mt-2'
          size='sm'
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default TodosTable;
