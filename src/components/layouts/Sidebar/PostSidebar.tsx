import React, { useState } from "react";
import styled from "styled-components";
import { FaUsers, FaRegNewspaper } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

type Props = {};

const PostSidebar = (props: Props) => {
  const location = useLocation();
  return (
    <Wrapper>
      <h2 className="title">Posts</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <NavLink
            to="/posts/new"
          >
              <button className={location.pathname === '/posts/new' ? 'active' : ''}>
                <FaRegNewspaper />
                New Posts
              </button>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/posts/following"
          >
              <button className={location.pathname === '/posts/following' ? 'active' : ''}>
                <FaUsers />
                Following
              </button>
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`

  .title {
    color: #d6d6d6;
    font-size: 20px;
    font-weight: 600;
    padding: 10px 24px;
    margin-top: 20px;
  }

  .sidebar-list {
    .sidebar-item {

      .active{
        background-color: var(--primary-color);
        color: var(--white-color);
      }

      button {
        width: 100%;
        padding: 10px 24px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        color: #333;

        svg {
          margin-right: 6px;
          color: #333;
          font-size: 22px;
        }

        &:hover {
          background-color: #f9f9f9;
        }

        &.active {
          color: var(--white-color);
          background-color: var(--primary-color);

          svg {
            color: var(--white-color);
          }
        }
      }
    }
  }
`;

export default PostSidebar;
