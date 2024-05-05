import { cookies } from 'next/headers';

export default function getCookie(name: string) {
  const cookieStore = cookies();
  const hasCookie = cookieStore.get(name);
  return hasCookie;
}
