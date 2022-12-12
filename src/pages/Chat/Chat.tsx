import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatSidebar from "./components/ChatSidebar";

type Props = {
  chatBox: React.ReactNode
};

const Chat = (props: Props) => {

  
  return (
    <Wrapper>
      <div className="chat">
        <div className="left-side-chat">
          <ChatSidebar  />
        </div>
        <div className="right-side-chat">
          {props.chatBox}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`

  .chat {
    display: flex;
    height: calc( 100vh - var(--header-height));
    margin-top: var(--header-height);

    .left-side-chat {
      width: 400px;
      height: 100%;
      background-color: #fff;
      overflow: hidden;
      z-index: 999;
    }

    .right-side-chat{
      flex: 1;
    }
  }
`;

export default Chat;
