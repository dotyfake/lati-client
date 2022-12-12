import { useAppSelector } from 'app/hooks';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useViewport } from 'utils/hooks';
import Root from './layouts/Root/Root';

type Props = {
    children: React.ReactNode
}

const PrivatePage = (props: Props) => {
    const navigate = useNavigate()
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 765;
    const isAuth = useAuth()
    const {login} = useAppSelector((state) => state)

    
    useEffect(()=> {
            if (!isAuth ) {
              if(isMobile){
                navigate('/auth')
              } else{
                navigate('/')
                login.showAuthForm()
              }
              }
    })
  return (
    <div >
        {isAuth ? props.children : <Root />}
    </div>
  )
}

export default PrivatePage