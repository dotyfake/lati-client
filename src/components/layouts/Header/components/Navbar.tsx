import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

type Props = {}

type NavList = {
    name: string;
    path: string;
    exact?: boolean;
  };
  

const navList: NavList[] = [
    { name: "Homepage", path: "/", exact: true },
    { name: "Posts", path: "/posts/new" },
  ];
  


const Navbar = (props: Props) => {
  
  return (
    <Wrapper className="flex items-center ">
        <ul className="flex items-center ">
            {navList.map((navItem, i) => (
              <li key={i} className="mx-1 text-lg font-semibold">
                <NavLink
                  to={navItem.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                      : undefined
                  }
                  end
                >
                  {navItem.name}
                </NavLink>
              </li>
            ))}
          </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  
`

export default Navbar