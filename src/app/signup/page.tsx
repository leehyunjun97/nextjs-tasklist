import SignupForm from '@/components/signup/SignupForm';
import React from 'react';

const SignupPage = async () => {
  return (
    <div className='flex flex-col w-96 items-center'>
      <h1 className='text-3xl'>Sign Up</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
