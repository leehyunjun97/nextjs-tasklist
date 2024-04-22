'use client';

import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { EyeSlashFilledIcon } from '../icon/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icon/EyeFilledIcon';

const SignupForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className='w-4/5 flex-wrap md:flex-nowrap gap-4 mt-10 space-y-4'>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input type='email' label='Email' variant='bordered' />
        <Button className='h-14' color='success'>
          중복확인
        </Button>
      </div>
      <Input type='text' label='Name' variant='bordered' />
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
      <div className='flex flex-row-reverse'>
        <Button color='warning'>회원가입</Button>
      </div>
    </div>
  );
};

export default SignupForm;
