import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FaPaperPlane, FaComment, FaHeart } from "react-icons/fa";

//components
import CreatePost from "./components/CreatePost";
import { LoadingIcon, InfiniteScroll } from "components";

//redux
import { useGetPostsQuery, useUpdateLikeMutation } from "redux/posts/postSlice";
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setUserInfo } from 'redux/user/loginSlice';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { PostType } from "utils/interfaces";
import { Link } from "react-router-dom";
import { log } from "console";
type Props = {};

const Posts = (props: Props) => {
  const {login} = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState<PostType>()

  const { data } = useGetPostsQuery({
    page: page,
  })

  const [updateLike, {data: dataLike}] = useUpdateLikeMutation()

  const handleUpdateLike = (postId : string, postUserId: string) => {
    
    if(login.userInfo){
      const userId = login.userInfo?.id
    updateLike({
      accessToken: login.userInfo?.accessToken,
      postId: postId,
      postUserId,
      isLiked: !!posts.find(post => post._id === postId && post.like?.includes(userId))
    })}
  }

  useEffect(() => {
    if (data) {
      const postsData = data.posts;
      setPosts([...posts, ...postsData]);
      setTotalRows(data.countPost);
    }
  }, [data]);
  

  useEffect(() => {
    if(newPost)
    setPosts([newPost, ...posts])
  }, [newPost]);

  useEffect(() => {
    if (dataLike && posts) {
     const newPosts = posts.map(post => {
       if(post._id ===  dataLike.postId){
         post = {...post, like: dataLike.like}
        }
        return post
      })
      setPosts(newPosts)
    }
  }, [dataLike]); 

  return (
    <Wrapper>
      <div className="posts wide-m">
        <CreatePost newPost = {setNewPost}/>

        <div className="news-feed">
          {posts ? (
            <InfiniteScroll
              loader={
                <div className="flex justify-center">
                  <LoadingIcon />
                </div>
              }
              fetchMore={() => setPage((prev) => prev + 1)}
              hasMore={posts.length < totalRows}
              endMessage={<>You have seen it all</>}
            >
                {posts.map((post, index) => {
                   const date = new Date(post.createdAt)
                  const dateTime = date.toLocaleTimeString("en-us",{
                   day: "numeric", hour: "2-digit", minute: "2-digit",
                   weekday: "long", year: "numeric", month: "short",
               })
               return <div className="post" key = {index}>
               <div className="post-header">
                 <Link to = {`/user/${post.user._id}`}>
                   <img
                     className="avatar"
                     src={post.user.avatar.avatarUrl}
                     alt=""
                   />
                 </Link>
                 <div className="post-name-time">
                   <Link to = {`/user/${post.user._id}`}>
                     <div className="name">{post.user.displayName}</div>
                   </Link>
                   <div className="time">{dateTime}</div>
                 </div>
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
                   <button className={post.like.includes(login.userInfo?.id) ? "btn-reaction like liked" : "btn-reaction like"} onClick={()=> handleUpdateLike(post._id, post.user._id)}>
                     <FaHeart />
                     { `${post.like.length}`}
                   </button>
                   <button className="btn-reaction comments">
                     <FaComment />
                     {`${post.comments.length}`}
                   </button>
                   <button className="btn-reaction chat">
                     <FaPaperPlane /> Chat
                   </button>
                 </div>
               </div>
             </div>
                }
                )}
            </InfiniteScroll>
          ) : (
            Array(5)
              .fill(0)
              .map((item, index) => (
                <div className="post" key = {index}>
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
              color: #333;
            }
          }
          .like {
            &.liked{
              svg {
                color: #e64aa0;
              }
            }
          }
        }
      }
    }
  }
`;

export default Posts;
