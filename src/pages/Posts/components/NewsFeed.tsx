import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FaPaperPlane, FaComment, FaHeart } from "react-icons/fa";

//components
import { LoadingIcon, InfiniteScroll } from "components";

//redux
import {
  useUpdateLikeMutation,
} from "redux/posts/postSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { setUserInfo } from "redux/user/loginSlice";
import { useUpdateUserFollowingMutation } from "redux/user/accountSlice/accountSlice";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link, useParams } from "react-router-dom";
import Sad from "components/layouts/Header/components/Sad";
import ListComment, { CommentType } from "./ListComment";

import { useAuth } from "utils/hooks";
import axiosPublic from "utils/axiosPublic";
import { PostType } from "utils/interfaces";

type Props = {
  newPost: PostType | undefined;
  fetchPostType: 'following' | 'profile' | 'newPosts';
  noMarginTop?: boolean;
};

const NewsFeed = (props: Props) => {
  const { login } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [listPost, setListPost] = useState<PostType[] | []>([])
  const isAuth = useAuth();
  const newPost = props.newPost;
  const param = useParams();

  const [updateLike, { data: dataLike, isSuccess }] = useUpdateLikeMutation();

  const [updateUserFollowing, { data: dataUserFollowing, isLoading }] =
  useUpdateUserFollowingMutation();

const handleUpdateUserFollowing = (post : PostType) => {
  const action = login.userInfo?.following.includes(post.user._id) ? "unfollow" : "follow";
  
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
        isLiked: !!listPost.find(
          (post) => post._id === postId && post.like?.includes(userId)
        ),
      });
    }
  };

  useEffect(()=> {
    const getPosts = async () => {
      const res = await axiosPublic.get('/posts/getPosts', {
        params: {
          page: page,
          following: props.fetchPostType === 'following' ? login.userInfo?.id : undefined,
          profile: props.fetchPostType === 'profile' ? param.userId : undefined,
          newPosts: props.fetchPostType === 'newPosts' ? login.userInfo?.id : undefined,
        }
      })
      if(res.data){
        setListPost([...listPost,...res.data.posts])
        setTotalRows(res.data.countPost)
      }
    }
    getPosts()
  },[page])

  useEffect(() => {
    if (login.userInfo)
      dispatch(
        setUserInfo({ ...login.userInfo, ...dataUserFollowing})
      );
  }, [dataUserFollowing]);

  useEffect(() => {
    if (newPost)
    setListPost([newPost, ...listPost] as [PostType])
  }, [newPost]);


  useEffect(() => {
    if (dataLike) {
      const newPosts = listPost.map((post) => {
        if (post._id === dataLike.postId) {
          post = { ...post, like: dataLike.like };
        }
        return post;
      });
      setListPost(newPosts)
    }
  }, [dataLike]);

  return (
    <Wrapper >
      <div className="posts wide-m">
        <div className="news-feed">
          {listPost.length > 0 ? (
            <InfiniteScroll
              loader={
                <div className="flex justify-center">
                  <LoadingIcon />
                </div>
              }
              fetchMore={() => setPage((prev) => prev + 1)}
              hasMore={listPost.length < totalRows}
              endMessage={<Sad content="You have seen it all!" />}
            >
              {listPost.map((post, index) => {
                const date = new Date(post.createdAt);
                const dateTime = date.toLocaleTimeString("en-us", {
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                });
                return (
                  <div className="post" key={index}>
                    <div className="post-header">
                      <div className="info-post">
                        <Link to={`/user/${post.user._id}`}>
                          <img
                            className="avatar"
                            src={post.user.avatar.avatarUrl}
                            alt=""
                          />
                        </Link>
                        <div className="post-name-time">
                          <Link to={`/user/${post.user._id}`}>
                            <div className="name">{post.user.displayName}</div>
                          </Link>
                          <div className="time">{dateTime}</div>
                        </div>
                      </div>
                      {post.user._id !== login.userInfo?.id && <div className="follow">
                        {!login.userInfo?.following.includes(post.user._id) ? (
                          <button className="btn-follow animate__animated animate__fadeInanimate__fadeOut" onClick={()=> handleUpdateUserFollowing(post)}>
                             <span>Follow</span>
                          </button>
                        ) : (
                          <button className="btn-following animate__animated animate__fadeInanimate__fadeOut" onClick={()=> handleUpdateUserFollowing(post)}>
                            <span>Following</span>
                          </button>
                        )}
                      </div>}
                    </div>
                    <div className="post-body">
                      <p className="post-content">{post.content}</p>
                      {post.photo.photoUrl && (
                        <div className="photo">
                          <img
                            className="image"
                            src={post.photo.photoUrl}
                            alt=""
                          />
                        </div>
                      )}
                      <div className="reaction">
                        <button
                          className={
                            login.userInfo &&
                            post.like.includes(login.userInfo?.id)
                              ? "btn-reaction like liked animate__animated animate__rubberBand"
                              : "btn-reaction like"
                          }
                          onClick={() =>
                            handleUpdateLike(post._id, post.user._id)
                          }
                        >
                          <FaHeart />
                          {`${post.like.length}`}
                        </button>
                        <button
                          className="btn-reaction comments"
                          onClick={() => setShowComments((prev) => !prev)}
                        >
                          <FaComment />
                          {`${post.comments.length}`}
                        </button>
                        <button className="btn-reaction chat">
                          <FaPaperPlane /> Chat
                        </button>
                      </div>
                      <ListComment postId={post._id} comments={post.comments} />
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : (
            Array(5)
              .fill(0)
              .map((item, index) => (
                <div className="post" key={index}>
                  <div className="post-header">
                    <Skeleton className="avatar" />
                    <div className="post-name-time">
                      <Skeleton width={160}></Skeleton>
                      <Skeleton width={120}></Skeleton>
                    </div>
                  </div>
                  <div className="post-body">
                    <Skeleton
                      className="post-content"
                      width={"80%"}
                      height={30}
                    />
                    <div className="photo">
                      <Skeleton className="image" />
                    </div>
                    <div className="reaction">
                      <Skeleton
                        width={200}
                        height={30}
                        className="btn-reaction"
                      ></Skeleton>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .posts {
    background-color: var(--white-color);
    margin: calc(var(--header-height) + 20px) auto 0;
    padding: 18px;
    border-radius: 4px;

    .post {
      padding: 20px;
      margin: 0 auto 20px;
      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
       .info-post{
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
       .follow{
        button{
          cursor: pointer;
          color: var(--primary-color);
          font-weight: 600;
        }
       }
      }
      .post-body {
        .post-content {
          font-size: 14px;
          font-weight: 500;
          margin: 12px 56px;
        }
        .photo {
          display: flex;
          justify-content: center;
          .image {
            width: 90vw;
            max-width: 540px;
            height: 540px;
            object-position: center;
            object-fit: cover;
            border-radius: 12px;
            margin: 0 auto;
          }
        }
        .reaction {
          display: flex;
          margin: 10px 56px;
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
  }
`;

export default NewsFeed;
