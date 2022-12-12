import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

const PostsMobileLayout = (props: Props) => {
  const location = useLocation();
  return (
    <Wrapper>
      <div className="tabs">
        <Link to="/">
          <button className="back">
            <FaChevronLeft />
          </button>
        </Link>
        <Link to="/posts/new">
          <button
            className={location.pathname === "/posts/new" ? "active" : ""}
          >
            New Posts
          </button>
        </Link>
        <Link to="/posts/following">
          <button
            className={location.pathname === "/posts/following" ? "active" : ""}
          >
            Following
          </button>
        </Link>
      </div>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .tabs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    background-color: var(--white-color);
    padding: 10px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 999;
    .back {
      float: left;
    }

    button {
      color: #333;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.4s;
      &.active {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;

export default PostsMobileLayout;
