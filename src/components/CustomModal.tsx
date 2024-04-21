import { CustomModalType, Todo } from '@/types/todo';
import {
  Button,
  CircularProgress,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Switch,
} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
  onEdit,
  onDelete,
}: {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
  onClose: () => void;
  onEdit: (id: number, title: string, isDone: boolean) => void;
  onDelete: (id: number) => void;
}) => {
  // 수정된 완료 선택
  const [isDone, setIsDone] = useState<boolean>(false);

  // 로딩 선택
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 수정된 할일 입력
  const [editedTodoInput, setEditedTodoInput] = useState('');

  useEffect(() => {
    if (focusedTodo) {
      setEditedTodoInput(focusedTodo.title);
      setIsDone(focusedTodo.is_done);
    }
  }, []);

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>할일 상세</ModalHeader>
        <ModalBody>
          <p>
            <span className='font-bold'>id: </span>
            {focusedTodo?.id}
          </p>

          <div className='flex py-1 space-x-2'>
            <span className='font-bold'>title:</span>
            <p>{`${focusedTodo?.title}`}</p>
          </div>
          <div className='flex py-1 space-x-2'>
            <span className='font-bold'>완료여부:</span>
            <p>{`${focusedTodo?.is_done ? '완료' : '미완료'}`}</p>
          </div>
          <div className='flex py-1 space-x-2'>
            <span className='font-bold'>생성일:</span>
            <p>{`${focusedTodo?.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='warning' variant='flat' onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const EditModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>할일 수정</ModalHeader>
        <ModalBody>
          <p>
            <span className='font-bold'>id: {focusedTodo?.id}</span>
          </p>
          <Input
            isRequired
            autoFocus
            label='할일 내용'
            placeholder='할일을 입력해주세요.'
            variant='bordered'
            defaultValue={focusedTodo?.title}
            value={editedTodoInput}
            onValueChange={setEditedTodoInput}
          />

          <div className='flex py-2 space-x-4'>
            <span className='font-bold'>완료여부: </span>
            <Switch
              defaultSelected={focusedTodo?.is_done}
              aria-label='Automatic updates'
              onValueChange={setIsDone}
              isSelected={isDone}
              color='warning'
            ></Switch>
            {`${isDone ? '완료' : '미완료'}`}
          </div>
          <div className='flex py-1 space-x-4'>
            <span className='font-bold'>작성일: </span>
            <p>{`${focusedTodo?.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='warning'
            onPress={() => {
              setIsLoading(true);
              if (focusedTodo) onEdit(focusedTodo?.id, editedTodoInput, isDone);
            }}
          >
            {isLoading ? (
              <CircularProgress
                color='warning'
                aria-label='Loading...'
                size='sm'
              />
            ) : (
              '수정'
            )}
          </Button>
          <Button variant='flat' onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>
          할일을 삭제하시겠습니까?
        </ModalHeader>
        <ModalBody>
          <p>
            <span className='font-bold'>id: </span>
            {focusedTodo?.id}
          </p>

          <div className='flex py-1 space-x-2'>
            <span className='font-bold'>title:</span>
            <p>{`${focusedTodo?.title}`}</p>
          </div>
          <div className='flex py-1 space-x-2'>
            <span className='font-bold'>완료여부:</span>
            <p>{`${focusedTodo?.is_done}`}</p>
          </div>
          <div className='flex py-1 space-x-2'>
            <span className='font-bold'>생성일:</span>
            <p>{`${focusedTodo?.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onPress={() => {
              setIsLoading(true);
              if (focusedTodo) onDelete(focusedTodo.id);
            }}
          >
            {isLoading ? (
              <CircularProgress
                color='warning'
                aria-label='Loading...'
                size='sm'
              />
            ) : (
              '삭제'
            )}
          </Button>
          <Button variant='flat' onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const getModal = (type: CustomModalType) => {
    switch (type) {
      case 'detail':
        return DetailModal();
      case 'update':
        return EditModal();
      case 'delete':
        return DeleteModal();
      default:
        return;
    }
  };

  return <>{getModal(modalType)}</>;
};

export default CustomModal;
