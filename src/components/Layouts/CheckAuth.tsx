import { AUTH_LOGIN } from '@/constants/routes';
import { asyncIsPreloadProcess } from '@/states/isPreload/action';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface CheckAuthProps {
  children: React.ReactNode
}

const CheckAuth = ({ children }: CheckAuthProps) => {
  const router = useRouter();
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states: any) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncIsPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (!isPreload && authUser === null) {
    router.push(AUTH_LOGIN);
  }

  return (
    <>
      {children}
    </>
  );
};

export default CheckAuth;