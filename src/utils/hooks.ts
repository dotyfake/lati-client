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

  export const useOnlineUsers = (userId: string) => {
    const { login } = useAppSelector(state => state);
    if(login.onlineUsers){
      
      const isOnlineUser = login.onlineUsers.some(user => user.userId === userId);
      return isOnlineUser
    }
};

