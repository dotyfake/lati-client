import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

const PostsHeader = (props: Props) => {
  const location = useLocation();

  return (
    <Wrapper>
      <div className="posts-header">
        <button className="back">
          <Link to="/">
            <FaChevronLeft />
          </Link>
        </button>
        <div className="tab">
          <Link to="/posts/new">
            <button
              className={location.pathname === "/posts/new" ? "active" : ""}
            >
              New Posts
            </button>
          </Link>
          <Link to="/posts/following">
            <button
              className={
                location.pathname === "/posts/following" ? "active" : ""
              }
            >
              Following
            </button>
          </Link>
        </div>
      </div>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .posts-header {
    height: 50px;
    display: flex;
    .back {
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tab {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 1;
    }
    .active {
      color: var(--primary-color);
      font-size: 18px;
      font-weight: 600;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        right: 0;
        left: 0;
        bottom: -4px;
        height: 4px;
        background-color: var(--primary-color);
        border-radius: 2px;
      }
    }
  }
`;

export default PostsHeader;
