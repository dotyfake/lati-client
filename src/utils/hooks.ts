import { useAppSelector } from 'app/hooks';
import React from 'react';
import { useState, useEffect } from 'react';

export const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return { width };
};

export const useAuth = () => {
    const { login } = useAppSelector(state => state);
    const isAuth = login.userInfo
    return isAuth
    
};

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
  
      return () => {
        clearTimeout(timer)
      }
    }, [value, delay])
  
    return debouncedValue
  }

  export const useNavigatorOnLine = () => {
    const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
    
    const [status, setStatus] = React.useState(getOnLineStatus());
  
    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);
  
    React.useEffect(() => {
      window.addEventListener('online', setOnline);
      window.addEventListener('offline', setOffline);
  
      return () => {
        window.removeEventListener('online', setOnline);
        window.removeEventListener('offline', setOffline);
      };
    }, []);
  
    return status;
  };



