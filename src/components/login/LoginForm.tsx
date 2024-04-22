'use client';

import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { EyeSlashFilledIcon } from '../icon/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icon/EyeFilledIcon';
import Link from 'next/link';

const LoginForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <div className='w-4/5 flex-wrap md:flex-nowrap gap-4 mt-10 space-y-4'>
        <Input type='email' label='Email' variant='bordered' />
        <Input
          label='Password'
          variant='bordered'
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
        <div className='flex justify-between'>
          <p className='text-xs text-gray-400'>
            <Link href={''}>회원가입</Link>
          </p>
          <Button color='warning'>로그인</Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
