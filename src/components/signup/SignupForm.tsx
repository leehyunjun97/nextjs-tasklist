'use client';

import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { EyeSlashFilledIcon } from '../icon/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icon/EyeFilledIcon';
import { User } from '@/types/user';
import { signValidation } from '@/utils/checkValidate';
import Link from 'next/link';
import { emailCheckService } from '@/services/user/user';

const SignupForm = () => {
  // 패스워드 type 변경 전용
  const [isVisible, setIsVisible] = useState(false);
  const [checkIsLoading, setCheckIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [signupState, setSignupState] = useState<User>({
    email: '',
    name: '',
    password: '',
  });

  const [emailCheck, setEmailCheck] = useState(false);
  const [emailError, setEmailError] = useState(' ');
  const [nameError, setNameError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const emailCheckHandler = async () => {
    if (!!!signupState.email.trim().length || emailError) return;

    setCheckIsLoading(true);
    await new Promise((f) => setTimeout(f, 300));
    const check = await emailCheckService(signupState.email);
    setCheckIsLoading(false);

    if (check.data) {
      setEmailCheck(true);
      setEmailError('아이디가 중복되었습니다.');
    } else {
      setEmailCheck(false);
      alert('회원가입이 가능한 아이디 입니다.');
    }
  };

  const signSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);
    await new Promise((f) => setTimeout(f, 300));

    if (emailCheck) {
      alert('이메일 중복 체크해주세요');
      setSubmitLoading(false);
      return;
    }

    if (emailError || passwordError || nameError) {
      alert('형식에 맞게 입력해주세요');
      setSubmitLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
      {
        method: 'post',
        body: JSON.stringify({
          email: signupState.email,
          name: signupState.name,
          password: signupState.password,
        }),
      }
    );
    const user = await response.json();

    // jwt 로직
    console.log(user.data);
  };

  return (
    <form
      className='w-4/5 flex-wrap md:flex-nowrap gap-4 mt-10 space-y-4'
      onSubmit={signSubmitHandler}
    >
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input
          type='email'
          label='Email'
          variant='bordered'
          value={signupState.email}
          onChange={(e) => {
            setEmailCheck(true);
            signValidation(e, 'email', setEmailError, setSignupState);
          }}
        />
        <Button
          className='h-14'
          color={'success'}
          onClick={emailCheckHandler}
          isLoading={checkIsLoading}
          disabled={checkIsLoading}
        >
          중복확인
        </Button>
      </div>
      <span className='text-red-400' aria-live='polite'>
        {emailError}
      </span>
      <Input
        type='text'
        label='Name'
        variant='bordered'
        value={signupState.name}
        required
        minLength={3}
        onChange={(e) =>
          signValidation(e, 'name', setNameError, setSignupState)
        }
      />
      <span className='text-red-400' aria-live='polite'>
        {nameError}
      </span>
      <Input
        label='Password'
        variant='bordered'
        value={signupState.password}
        required
        minLength={3}
        onChange={(e) =>
          signValidation(e, 'password', setPasswordError, setSignupState)
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
        {passwordError}
      </span>
      <div className='flex justify-between'>
        <p className='text-xs text-gray-400'>
          <Link href={'/'}>로그인</Link>
        </p>
        <Button
          type='submit'
          color='warning'
          isLoading={submitLoading}
          disabled={submitLoading}
        >
          회원가입
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
