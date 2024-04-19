import { CustomModalType, Todo } from '@/types/todo';
import { Button, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
}: {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
  onClose: () => void;
}) => {
  const DetailModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>{modalType}</ModalHeader>
        <ModalBody>
          <p>상세 모달</p>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            닫기
          </Button>
          <Button color='primary' onPress={onClose}>
            액션
          </Button>
        </ModalFooter>
      </>
    );
  };

  const EditModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>{modalType}</ModalHeader>
        <ModalBody>
          <p>수정 모달</p>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            닫기
          </Button>
          <Button color='primary' onPress={onClose}>
            액션
          </Button>
        </ModalFooter>
      </>
    );
  };

  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className='flex flex-col gap-1'>{modalType}</ModalHeader>
        <ModalBody>
          <p>삭제 모달</p>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            닫기
          </Button>
          <Button color='primary' onPress={onClose}>
            액션
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
