import LoginForm from '@/components/login/LoginForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col w-96 items-center'>
      <h1 className='text-3xl'>Login</h1>
      <LoginForm />
    </div>
  );
}
