import React from 'react'
import { Outlet } from 'react-router-dom';
import { FooterMobile } from "components/index";

type Props = {}

const Root = (props: Props) => {
  return (
    <div>
        <Outlet />
      <FooterMobile />
    </div>
  )
}

export default Root