import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useOnlineUsers } from 'utils/hooks';

type Props = {
    src: string;
    id: string;
    status? : string;
    size?: number;
}

type StyledType = {
  isUserOnline? : boolean;
    size?: number;
}

const AvatarChat = (props: Props) => {
  const isUserOnline = useOnlineUsers(props.id);
  
  return (
    <StyledAvatar isUserOnline = {isUserOnline} size = {props.size}>
        <Link to = {`/chat/${props.id}`}>
          <img src={props.src} alt="avatar" />
          <div className="online-dot"></div>
        </Link>
    </StyledAvatar>
  )
}

const StyledAvatar = styled.div<StyledType>`
     position: relative;
     display: inline-block;
      .online-dot{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--white-color);
        background-color: ${props => props.isUserOnline ? '#34c94d' : '#8d918d'}
      }
      img {
        width: ${props => props.size ? `${props.size}px` : '50px' };
        height: ${props => props.size ? `${props.size}px` : '50px' };
        border-radius: 50%;
        object-fit: cover;
      }
`

export default AvatarChat