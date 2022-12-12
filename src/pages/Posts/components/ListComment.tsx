import React, { useState, useEffect } from "react";
import { useCreateCommentMutation } from "redux/posts/postSlice";
import styled from "styled-components";
import { useAppSelector } from "app/hooks";
import { Link } from "react-router-dom";
import { useAuth } from "utils/hooks";

type Props = {
  postId: string;
  comments: [CommentType];
};

export type CommentType = {
  content: string;
  nickname: string;
  avatarUrl: string;
  userId: string;
};

const ListComment = (props: Props) => {
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [countComments, setCountComments] = useState(0)
  const [comments, setComments] = useState(() => {
    if (props.comments.length > 0) {
      return [props.comments[props.comments.length - 1]];
    } else {
      return [];
    }
  });
  const { login } = useAppSelector((state) => state);
  const isAuth = useAuth()

  


  const [createComment, { data: dataComments }] = useCreateCommentMutation();

  const handleCreateComment = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.key === "Enter" && isAuth) {
      createComment({
        accessToken: login.userInfo?.accessToken,
        content: inputCommentValue,
        postId: props.postId,
      });
      setInputCommentValue("");
      setCountComments(prev => ++prev)
    }
  };

  const handleViewMore = () => {
    if (props.comments.length > 0) {
      setComments(props.comments);
    }
  };


  useEffect(() => {
    if (dataComments) {
      setComments([dataComments.comment, ...comments]);
    }
  }, [dataComments]);
  return (
    <Wrapper>
      <div className="list-comment">
        {isAuth &&<input
          className="input-comment"
          type="text"
          placeholder="Write a comment..."
          value={inputCommentValue}
          onKeyDown={handleCreateComment}
          onChange={(e) => {
            setInputCommentValue(e.target.value);
          }}
        ></input>}
        {comments &&
          comments.map((comment, i) => (
            <div key={i}>
              <div className="comment animate__animated animate__fadeInDown">
                <div className="avatar">
                  <Link to={`/user/${comment.userId}`}>
                    <img src={comment.avatarUrl} alt="" />
                  </Link>
                </div>
                <div className="comment-body">
                  <Link to={`/user/${comment.userId}`}>
                    <div className="nickname">{comment.nickname}</div>
                  </Link>
                  <div className="comment-content">{comment.content}</div>
                </div>
              </div>
            </div>
          ))}

        {comments && comments.length < props.comments.length && (
          <div className="more">
            <button onClick={handleViewMore}>View more comments</button>
            <p>{`${comments.length} of ${props.comments.length + countComments}`}</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .list-comment {
    margin: 20px 0;
    .input-comment {
      width: 100%;
      height: 40px;
      border-radius: 20px;
      padding: 6px 14px;
      outline: none;
      background-color: #f4f0f5;
      margin-bottom: 10px;

      &::placeholder {
        color: #444;
      }
    }
    .comment {
      display: inline-flex;
      .avatar {
        margin-right: 8px;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .comment-body {
        flex: 1;
        background-color: #f4f0f5;
        border-radius: 8px;
        padding: 8px;

        .nickname {
          font-size: 13px;
          font-weight: 600;
        }
        .comment-content {
          font-size: 13px;
          font-weight: 500;
        }
      }
    }
    .more {
      margin-top: 10px;
      display: block;
      text-align: center;
      color: #4e4b4b;

      button {
        font-weight: 500;
        text-decoration: underline;

        &:hover {
          color: #1a1818;
        }
      }

      p {
        float: right;
      }
    }
  }
`;

export default ListComment;
