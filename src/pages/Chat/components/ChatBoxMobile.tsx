import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AvatarChat from "./AvatarChat";
import { FaAngleLeft, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { Link, useParams } from "react-router-dom";
import { useSendMessageMutation, useCreateChatMutation, useGetChatsMutation, useGetChatIdMutation, useGetMessagesMutation } from "redux/chat/chatApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setListChat } from "redux/chat/chatSlice";
import { useGetUserQuery } from "redux/user/userDetailSlice";
import Skeleton from "react-loading-skeleton";
import { MessageType } from "utils/interfaces";
import {format} from 'timeago.js'
import { useOnlineUsers } from "utils/hooks";
import { io, Socket } from 'socket.io-client';

type Props = {};

const ChatBoxMobile = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [showBoxEmoji, setShowBoxEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState<MessageType[] | []>([]);
  const [chatId, setChatId] = useState("")

  const params = useParams();
  const isUserOnline = useOnlineUsers(params.userId as string);
  const socket = useRef<Socket>();
  
  const secondRender = useRef(false);
  const scroll = useRef<HTMLDivElement>(null);

  const [getChatId, {data: chatIdData}] = useGetChatIdMutation()
  const [getChats, { data: dataChats }] = useGetChatsMutation();
  const [createChat, { data }] = useCreateChatMutation();
  const [sendMessage, { data: MessageData }] = useSendMessageMutation();
  const [getMessages, { data: MessagesData }] = useGetMessagesMutation();
  const {data: userData} = useGetUserQuery(params.userId as string)
  
  const handleSetMessage = (emoji: { emoji: React.SetStateAction<string> }) =>
    setMessage((prev) => (prev += emoji.emoji));

  const handleSetShowBoxEmoji = () => {
    setShowBoxEmoji((prev) => !prev);
  };
  const handleSendMessage = () => {
    if(message.length > 0 && userData) {
      const mess = {chatId: chatId,
        text: message, senderId: login.userInfo?.id, createdAt: Date.now()};
      sendMessage({
        accessToken: login.userInfo?.accessToken,
        chatId: chatId,
        text: message
      })
      setListMessage([...listMessage, mess] as MessageType[])

        // Send Message to socket server\
        if(socket.current){
          socket.current.emit("send-message", {...mess,receiverId: params.userId});
        }
    }
    setMessage('')
  }

  const handleChangeInput = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(e.target.value);
  }

  const handleKeyDown = (e: any) => {
    if(e.key === 'Enter') {
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (secondRender.current) {
      createChat({
        accessToken: login.userInfo?.accessToken,
        receiverId: params.userId,
      });
    } else secondRender.current = true;
    setListMessage([]);


    socket.current = io(`ws://${process.env.BASE_URL}:8800`);
    socket.current.emit("join-room", login.onlineUsers?.find(user => user.userId === login.userInfo?.id)?.socketId);

  }, [params.userId]);

  useEffect(() => {
    getChats(`${login.userInfo?.accessToken}`);
    getChatId({accessToken: login.userInfo?.accessToken, receiverId: params.userId})
  }, [data]);

  useEffect(() => {
    if(chatIdData && data){
      setChatId(chatIdData.chatId._id)
      getMessages({accessToken: login.userInfo?.accessToken, chatId: chatIdData.chatId._id})
    }
  }, [chatIdData])

   // Always scroll to last Message
   useEffect(()=> {
    scroll.current?.scrollTo(0,scroll.current.scrollHeight)
  },[listMessage])

  useEffect(() => {
    if (dataChats) dispatch(setListChat(dataChats.listReceiver));
  }, [dataChats]);

  useEffect(() => {
    if(MessagesData)
    setListMessage(MessagesData.messages)
  },[MessagesData])

// Get the message from socket server
useEffect(() => {
 if(socket.current){
  socket.current.on("receive-message", (mess) => {
    setListMessage([...listMessage, mess] as MessageType[])
  });
}
}, [MessageData]);
  return (
    <ChatBoxStyled>
      {userData ? <div className="chat-header">
        <Link to = "/chat">
            <div className="back">
            <FaAngleLeft />
            </div>
        </Link>
        <AvatarChat
          src={userData?.avatar.avatarUrl}
          id={userData?._id}
          size = {40}
        />
        <div className="info">
          <div className="name">{userData?.displayName}</div>
          <div className="status">{isUserOnline ? "Online" : "Offline"}</div>
        </div>
      </div> : <div className="chat-header">
        <Skeleton circle width= {50} height= {50}/>
        <div className="info">
          <div className="name"><Skeleton /></div>
          <div className="status"><Skeleton width= {70}/></div>
        </div>
      </div>}
      <div className="chat-content">
        {listMessage.map((message) => <div className={message.senderId === params.userId ? 'receiver' : 'sender'}>
        {message.senderId === params.userId && 
        <div><AvatarChat
        src={userData?.avatar.avatarUrl}
        size={34}
        id={userData?._id}
      /></div>}
          <div className="text">
          <p className="message"> {message.text}
          </p>
          <span>{format(message.createdAt)}</span>
          </div>
        </div>)}
      </div>
      <div className="chat-footer">
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className="emoji" onClick={handleSetShowBoxEmoji}>
          <FaSmile />
        </button>
        {showBoxEmoji && (
          <div className="emoji-box">
            <EmojiPicker
              onEmojiClick={handleSetMessage}
              lazyLoadEmojis={true}
            />
          </div>
        )}
        <button className="send" onClick={handleSendMessage}>Send</button>
      </div>
      {showBoxEmoji && (
        <div className="overlay" onClick={handleSetShowBoxEmoji}></div>
      )}
    </ChatBoxStyled>
  );
};

const ChatBoxStyled = styled.div`
  .chat-header {
    background-color: var(--white-color);
    display: flex;
    align-items: center;
    padding: 4px 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
        .back{
            margin-right: 5px;
            svg{
                font-size: 24px;
                color: #333;
            }
        }

    &::before{
      content: '';
      position: absolute;
      bottom: 0px;
      left: 20px;
      right: 20px;
      height: 1px;
      background-color: var(--primary-color);
    }
    .info {
      margin-left: 10px;
      .name {
        font-weight: 600;
        color: #222;
        max-width: 250px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .status {
        font-size: 14px;
        color: #535151;
      }
    }
  }

  .chat-content {
    width: 100%;
    height: 100vh;
    padding: 60px 5px 64px 5px;
    overflow-y: auto;
    overflow-x: hidden;


    .sender {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 6px;
      p {
        display: inline-block;
        border-radius: 15px;
        padding: 0 10px;
        color: #fff;
        background-image: linear-gradient(90deg, #8b5cf6, #aa92df, #8b5cf6);
      }
      span{ 
        display: block;
        text-align: right;
        white-space: nowrap;
        bottom: -16px;
        color: #333;
        font-size: 10px;
        font-weight: 500;
      }
    }

    .receiver {
      margin-bottom: 6px;
      display: flex;
      .text{
        margin-left: 10px;
        max-width: 250px;
      }
      p {
        display: inline-block;
        border-radius: 15px;
        padding: 0 10px;
        color: #fff;
        background-image: linear-gradient(90deg, #3b5fd4, #8284d4, #3b5fd4);
      }
      span{ 
        display: block;
        margin-top: 2px;
        margin-left: 10px;
        white-space: nowrap;
        bottom: -16px;
        color: #333;
        font-size: 10px;
        font-weight: 500;
      }
    }

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

  .chat-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    .chat-input {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 10px;
      margin: 10px;
      border: 1px solid #999;
      border-radius: 20px;
      overflow: hidden;
      flex: 1;
      input {
        outline: none;
        flex: 1;
      }
    }
    .emoji {
      margin-right: 10px;
      position: relative;
      svg {
        font-size: 24px;
        color: var(--primary-color);
      }
    }
    .emoji-box {
      position: absolute;
      bottom: 160px;
      right: 10px;
      z-index: 10000;
    }
    .send {
      height: 40px;
      border-radius: 20px;
      padding: 10px;
      background-color: var(--primary-color);
      color: var(--white-color);
      font-size: 16px;
      font-weight: 600;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9000;
  }
`;

export default ChatBoxMobile;
