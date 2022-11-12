import { useAppSelector } from 'app/hooks';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

const PrivatePage = (props: Props) => {
    const { login } = useAppSelector((state) => state);
    const navigate = useNavigate()
    useEffect(()=> {
        if(!login.userInfo){
            navigate('/')
        }
    },[])

  return (
    <div>
        {props.children}
    </div>
  )
}

export default PrivatePage