import React from 'react';

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='justify-center inline-block max-w-lg text-center'>
      {children}
    </div>
  );
};

export default SignupLayout;
