import { User } from './user';

export type Todo = {
  id: number;
  title: string;
  is_done: boolean;
  created_at: Date;
  author: {
    email: string;
    name: string;
  };
  authorId: number;
};

export type CustomModalType = 'detail' | 'update' | 'delete';

export type FocusedTodoType = {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
};
