import React from 'react'
import { Outlet } from 'react-router-dom';
import { Footer, Header } from "components/index";

type Props = {}

const Root = (props: Props) => {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default Root