import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useOnlineUsers } from "utils/hooks";
import { ChatType } from "utils/interfaces";
import AvatarChat from "./AvatarChat";

type Props = {
  data: ChatType
};

type StyledType = {
  isUserOnline: boolean;
}

const Conversation = (props: Props) => {
  const params = useParams()
  const isUserOnline = useOnlineUsers(props.data.receiver._id);

  return (
    <Wrapper isUserOnline = {isUserOnline as boolean}>
        <div className="wrapper">
      <Link to = {`/chat/${props.data.receiver._id}`}>
          <div className={params.userId === props.data.receiver._id ? 'conversation active' : 'conversation'}>
            <div className="avatar">
            <AvatarChat src = {props.data.receiver.avatar.avatarUrl} size = {60} id = {props.data.receiver._id}/>
            </div>
            <div className="info">
              <div className="name">{props.data.receiver.displayName}  </div>
              <div className="status">{isUserOnline ? "Online" : "Offline"}</div>
            </div>
          </div>
      </Link>
        </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<StyledType>`

  .conversation {
    padding: 10px;
    display: flex;
    overflow: hidden;

    .info{
      margin-left: 10px;

      .name{
        font-weight: 600;
        color: #222;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .status{
        font-size: 14px;
        color: ${props => props.isUserOnline ? '#22e442' : '#535151'};
        font-weight: 600;
      }
    }

    &.active{
      background-color: #f5e5f3;
    }
  }
`;
export default Conversation;
