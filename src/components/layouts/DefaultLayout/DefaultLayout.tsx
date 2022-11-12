import React from "react";
import styled from "styled-components";

type Props = {
  content: React.ReactNode;
  sidebar: React.ReactNode;
};
const Wrapper = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #fff;
    width: var(--sidebar-w);
    margin-top: var(--header-height);
    z-index:999;

    .list-item {
      max-height: calc(100vh - var(--header-height));
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      &::-webkit-scrollbar-thumb {
        background: #8b5cf6;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #7c4bf0;
      }
    }
  }

  .content{
    margin-top: var(--header-height);
    margin-left: var(--sidebar-w)
  }
`;

const DefaultLayout = (props: Props) => {
  return (
    <Wrapper>
      <aside className="sidebar">
        <div className="list-item">{props.sidebar}</div>
      </aside>
      <div className="content">{props.content}</div>
    </Wrapper>
  );
};

export default DefaultLayout;
