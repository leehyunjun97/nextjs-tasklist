'use client';

import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { EyeSlashFilledIcon } from '../icon/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icon/EyeFilledIcon';
import Link from 'next/link';
import { User } from '@/types/user';
import { inputChangeHandler } from '@/utils/useFormLogic';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [signInState, setSignInState] = useState<User>({
    email: '',
    password: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);
    await new Promise((f) => setTimeout(f, 300));

    if (
      !!!signInState.email.trim().length ||
      !!!signInState.password.trim().length
    ) {
      setError('- 아이디 및 비밀번호를 확인해주세요');
      setSubmitLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
        {
          method: 'post',
          body: JSON.stringify({
            email: signInState.email,
            password: signInState.password,
          }),
        }
      );
      const user = await response.json();

      if (!user) {
        setError('- 아이디 및 비밀번호를 확인해주세요');
      }

      // jwt 로직
      console.log(user.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={loginSubmitHandler}
        className='w-4/5 flex-wrap md:flex-nowrap gap-4 mt-10 space-y-4'
      >
        <Input
          type='email'
          label='Email'
          variant='bordered'
          required
          value={signInState.email}
          onChange={(e) =>
            inputChangeHandler('email', e.target.value, setSignInState)
          }
        />
        <Input
          label='Password'
          variant='bordered'
          required
          value={signInState.password}
          onChange={(e) =>
            inputChangeHandler('password', e.target.value, setSignInState)
          }
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
        />
        <span className='text-red-400' aria-live='polite'>
          {error}
        </span>
        <div className='flex justify-between'>
          <p className='text-xs text-gray-400'>
            <Link href={'/signup'}>회원가입</Link>
          </p>
          <Button
            type='submit'
            color='warning'
            isLoading={submitLoading}
            disabled={submitLoading}
          >
            로그인
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
