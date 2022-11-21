import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'utils/hooks';

type Props = {
    children: React.ReactNode
}

const PrivatePage = (props: Props) => {
    const navigate = useNavigate()
    const isAuth = useAuth()
    
    useEffect(()=> {
            if (!isAuth ) {
                navigate('/')
              }
    },[])
  return (
    <div >
        {props.children}
    </div>
  )
}

export default PrivatePage