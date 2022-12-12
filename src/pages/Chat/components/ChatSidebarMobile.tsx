import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper";
import Conversation from "./Conversation";
import AvatarChat from "./AvatarChat";
import { FollowingUserType } from "utils/interfaces";
import Skeleton from "react-loading-skeleton";
import { setListChat } from "redux/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Search } from "components/layouts/Header/components";
import { useGetFollowingUserMutation } from "redux/user/accountSlice/accountSlice";
import { useGetChatsMutation} from "redux/chat/chatApi";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
};


const ChatSidebarMobile = (props: Props) => {
  const dispatch = useAppDispatch()
  const {chat, login} = useAppSelector((state) => state)
  const [followingUsers, setFollowingUser] = useState<FollowingUserType[] | []>(
    []
  );

  const [getFollowingUser, {data : dataUserFollowing}] = useGetFollowingUserMutation()

  const [getChats, {data: dataChats}] = useGetChatsMutation()
  
  useEffect(() => {
    getChats(`${login.userInfo?.accessToken}`)
    getFollowingUser(`${login.userInfo?.accessToken}`)
  },[])

  useEffect(() => {
    getFollowingUser(`${login.userInfo?.accessToken}`)
  },[login.userInfo?.following])

  useEffect(() => {
    if (dataUserFollowing) {
      setFollowingUser(dataUserFollowing.following);
    }
  }, [dataUserFollowing]);

  useEffect(() => {
    if (dataChats) {
      dispatch(setListChat(dataChats.listReceiver))
    }
  }, [dataChats]);

  return (
    <Wrapper>
      <div className="chat-sidebar">
        <div className="chat-header">
        <Link to = '/'>
            <div className="back">
                <FaAngleLeft />
            </div>
        </Link>
        <div className="chat-search">
          <Search type = 'chat'/>
        </div>
        </div>
        <h2>Following User</h2>
        <div className="chat-following">
          <Swiper
            slidesPerView={5.3}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
          >
            {followingUsers.length > 0
              ? followingUsers.map((user) => (
                  <SwiperSlide key={user._id}>
                    <div className="following-user">
                      <AvatarChat
                        src={user.avatar.avatarUrl}
                        size={60}
                        id={user._id}
                      />
                    </div>
                  </SwiperSlide>
                ))
              : Array(6)
                  .fill(0)
                  .map((skeleton, i) => (
                    <SwiperSlide key={i}>
                      <Skeleton width={60} height={60} circle />
                    </SwiperSlide>
                  ))}
          </Swiper>
        </div>
        <h2 className="title-chat">Chat</h2>
        <div className="list-chat">
          {chat.listChat && chat.listChat.map((conversation) => (
              <Conversation key={conversation.chatId} data = {conversation}/>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .chat-sidebar {
    .chat-header{
        display: flex;
        align-items: center;
        .back{
            margin-left: 5px;
            svg{
                font-size: 24px;
                color: #333;
            }
        }
    }
    .chat-search {
      margin: 10px;
      display: flex;
      justify-content:center;
    }

    .chat-following {
      margin: 0 10px;
    }

    .list-chat {
      overflow: auto;
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

    h2 {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-color);

      &.title-chat{
        margin-top: 10px;
      }
    }
  }
`;

export default ChatSidebarMobile;
