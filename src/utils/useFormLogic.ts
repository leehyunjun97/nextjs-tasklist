import { User, userSignKeyType } from '@/types/user';

export const inputChangeHandler = (
  key: userSignKeyType,
  value: string,
  setState: React.Dispatch<React.SetStateAction<User>>
) => {
  setState((prev) => ({ ...prev, [key]: value }));
};
