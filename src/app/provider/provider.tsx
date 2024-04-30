'use client';

import { RecoilRoot } from 'recoil';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <NextUIProvider>{children}</NextUIProvider>
    </RecoilRoot>
  );
}
