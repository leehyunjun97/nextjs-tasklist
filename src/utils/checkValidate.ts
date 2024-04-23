import { User, userSignKeyType } from '@/types/user';
import { inputChangeHandler } from './useFormLogic';

export const signValidation = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: userSignKeyType,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSignState: React.Dispatch<React.SetStateAction<User>>
) => {
  const { validity } = e.target;

  const text =
    key === 'email' ? '이메일' : key === 'name' ? '이름' : '패스워드';

  if (e.target.value.trim().length === 0) {
    setError(`${text}을(를) 입력해주세요.`);
  } else {
    setError('');
  }

  if (validity.typeMismatch) {
    setError(`${text} 형식이 아닙니다.`);
  } else if (validity.tooShort) {
    setError(`3자 이상이어야 합니다.`);
  } else if (validity.valueMissing) {
    setError(`${text}을(를) 입력해주세요.`);
  }

  inputChangeHandler(key, e.target.value, setSignState);
};
