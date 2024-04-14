import React from 'react';

const TodosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8'>
      <div className='justify-center inline-block max-w-lg text-center'>
        {children}
      </div>
    </section>
  );
};

export default TodosLayout;
