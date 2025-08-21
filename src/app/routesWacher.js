'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isLoggedIn } from '@/services/authServices';

export default function RouteWatcher() {
  const pathname = usePathname();
  const router = useRouter();

  const pupbicPaths = ['/', '/login', '/signup', 'forgotpassword'];

  useEffect(() => {
    if (!pathname) return;

    async function checkIsLoggedIn() {
      try {
        if (!pupbicPaths.includes(pathname)) {
          const res = await isLoggedIn();
          if (res && (res.status !== 200)) {
            router.push('/login');
          }
        }
      } catch (err) {
        router.push('/login');
      }
    }

    checkIsLoggedIn();

  }, [pathname]);

  return null;
}
