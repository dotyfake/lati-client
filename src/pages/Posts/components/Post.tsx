import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostType } from "utils/interfaces";
import { format } from "timeago.js";

import { FaComment, FaHeart, FaPaperPlane } from "react-icons/fa";
import ListComment from "./ListComment";
import { useAuth, useViewport } from "utils/hooks";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useUpdateUserFollowingMutation } from "redux/user/accountSlice/accountSlice";
import { setUserInfo } from "redux/user/loginSlice";
import {
  useCreateCommentMutation,
  useUpdateLikeMutation,
} from "redux/posts/postSlice";

type Props = {
  postData: PostType;
};

interface StyledWrapperType {
  isMobile?: boolean;
}

export type CommentType = {
  content: string;
  nickname: string;
  avatarUrl: string;
  userId: string;
};

const Post = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const post = props.postData;

  

  const [listLike, setListLike] = useState(post.like);
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [countComments, setCountComments] = useState(0);
  const [comments, setComments] = useState(() => {
    if (post.comments.length > 0) {
      return [post.comments[post.comments.length - 1]];
    } else {
      return [];
    }
  });

  const dispatch = useAppDispatch();

  const isAuth = useAuth();
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 765;

  const [updateLike, { data: dataLike }] = useUpdateLikeMutation();

  const [updateUserFollowing, { data: dataUserFollowing }] =
    useUpdateUserFollowingMutation();

  const [createComment, { data: dataComments }] = useCreateCommentMutation();

  const handleUpdateUserFollowing = (post: PostType) => {
    const action = login.userInfo?.following.includes(post.user._id)
      ? "unfollow"
      : "follow";

    if (login.userInfo)
      updateUserFollowing({
        accessToken: login.userInfo?.accessToken,
        action: action,
        followingUserId: post.user._id,
      });
  };

  const handleUpdateLike = (postId: string, postUserId: string) => {
    if (login.userInfo && isAuth) {
      const userId = login.userInfo?.id;
      updateLike({
        accessToken: login.userInfo?.accessToken,
        postId: postId,
        postUserId,
        isLiked: listLike.includes(userId),
      });
    }
  };

  const handleCreateComment = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.key === "Enter" && isAuth) {
      createComment({
        accessToken: login.userInfo?.accessToken,
        content: inputCommentValue,
        postId: post._id,
      });
      setInputCommentValue("");
      setCountComments((prev) => ++prev);
    }
  };

  const handleViewMore = () => {
    if (post.comments.length > 0) {
      setComments(post.comments);
    }
  };

  useEffect(() => {
    if (dataComments) {
      setComments([dataComments.comment, ...comments]);
    }
  }, [dataComments]);

  useEffect(() => {
    if (login.userInfo)
      dispatch(setUserInfo({ ...login.userInfo, ...dataUserFollowing }));
  }, [dataUserFollowing]);

  useEffect(() => {
    if (dataLike) {
      setListLike(dataLike.like);
    }
  }, [dataLike]);

  return (
    <Wrapper isMobile={isMobile}>
      <div className="post">
        <div className="post-header">
          <div className="info-post">
            <Link to={`/user/${post.user._id}`}>
              <img className="avatar" src={post.user.avatar.avatarUrl} alt="" />
            </Link>
            <div className="post-name-time">
              <Link to={`/user/${post.user._id}`}>
                <div className="name">{post.user.displayName}</div>
              </Link>
              <div className="time">{format(post.createdAt)}</div>
            </div>
          </div>
          {!isAuth ||
            (post.user._id !== login.userInfo?.id && (
              <div className="follow">
                {!login.userInfo?.following.includes(post.user._id) ? (
                  <button
                    className="btn-follow animate__animated animate__fadeInanimate__fadeOut"
                    onClick={() => handleUpdateUserFollowing(post)}
                  >
                    <span>Follow</span>
                  </button>
                ) : (
                  <button
                    className="btn-following animate__animated animate__fadeInanimate__fadeOut"
                    onClick={() => handleUpdateUserFollowing(post)}
                  >
                    <span>Following</span>
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className="post-body">
          <div className="post-group">
            <p className="post-content">{post.content}</p>
            {post.photo.photoUrl && (
              <div className="photo">
                <img className="image" src={post.photo.photoUrl} alt="" />
              </div>
            )}
            <div className="reaction">
              <button
                className={
                  login.userInfo && listLike.includes(login.userInfo.id)
                    ? "btn-reaction like liked animate__animated animate__rubberBand"
                    : "btn-reaction like"
                }
                onClick={() => handleUpdateLike(post._id, post.user._id)}
              >
                <FaHeart />
                {`${listLike.length}`}
              </button>
              <button className="btn-reaction comments">
                <FaComment />
                {`${post.comments.length}`}
              </button>
              <Link to = {`/chat/${post.user._id}`}>
                <button className="btn-reaction chat">
                  <FaPaperPlane /> Chat
                </button>
              </Link>
            </div>
            <div className="list-comment">
            {isAuth && (
              <input
                className="input-comment"
                type="text"
                placeholder="Write a comment..."
                value={inputCommentValue}
                onKeyDown={handleCreateComment}
                onChange={(e) => {
                  setInputCommentValue(e.target.value);
                }}
              ></input>
            )}
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

            {comments && comments.length < post.comments.length && (
              <div className="more">
                <button onClick={handleViewMore}>View more comments</button>
                <p>{`${comments.length} of ${
                  post.comments.length + countComments
                }`}</p>
              </div>
            )}
          </div>
          </div>
          
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<StyledWrapperType>`
  .post {
    margin: 0 auto 20px;
    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info-post {
        display: flex;
        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-position: center;
          object-fit: cover;
        }
        .post-name-time {
          margin-left: 8px;
          .name {
            font-weight: 500;
          }
          .time {
            color: #999;
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
      .follow {
        button {
          cursor: pointer;
          color: var(--primary-color);
          font-weight: 600;
        }
      }
    }
    .post-body {
      .post-group {
        width: ${(props) => (props.isMobile ? "95vw" : "540px")};
        margin: 0 auto;
      }
      .post-content {
        font-size: 14px;
        font-weight: 500;
        margin: 12px 0;
      }
      .photo {
        .image {
          width: ${(props) => (props.isMobile ? "90%" : "540px")};
          height: ${(props) => (props.isMobile ? "300px" : "540px")};
          object-position: center;
          object-fit: cover;
          border-radius: ${(props) => (props.isMobile ? "6px" : "12px")};
        }
      }
      .reaction {
        display: flex;
        margin: 12px 0;
        .btn-reaction {
          display: flex;
          margin-right: 18px;
          svg {
            font-size: 22px;
            margin-right: 4px;
            color: #cdcdcd;
            transition: all 0.4s;
          }
        }
        .like {
          &.liked {
            svg {
              color: var(--primary-color);
            }
          }
        }
        .comments {
          cursor: default;
        }
      }

      .chat {
        &:hover {
          svg {
            color: var(--primary-color);
          }
        }
      }
    }
  }

  .list-comment {
    margin-top: 20px;
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

export default Post;
