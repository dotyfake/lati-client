import { useEffect, useState } from "react";
import styled from "styled-components";


//components
import { InfiniteScroll, LoadingIcon, PageAnimate } from "components";

//redux
import { useAppSelector } from "app/hooks";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Sad from "components/layouts/Header/components/Sad";
import { useParams } from "react-router-dom";

import axiosPublic from "utils/axiosPublic";
import { useAuth, useViewport } from "utils/hooks";
import { PostType } from "utils/interfaces";
import Post from "./Post";

type Props = {
  newPost: PostType | undefined;
  fetchPostType: 'following' | 'profile' | 'newPosts';
  noMarginTop?: boolean;
  isMobile?: boolean
};

interface StyledWrapperType {
  noMarginTop?: boolean,
  isMobile?: boolean
}



const NewsFeed = (props: Props) => {
  const { login } = useAppSelector((state) => state);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [listPost, setListPost] = useState<PostType[] | []>([])
  const isAuth = useAuth();
  const newPost = props.newPost;
  const param = useParams();

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 765;


  useEffect(()=> {
    const getPosts = async () => {
      const res = await axiosPublic.get('/posts/getPosts', {
        params: {
          page: page,
          following: props.fetchPostType === 'following' ? login.userInfo?.id : undefined,
          profile: props.fetchPostType === 'profile' ? param.userId : undefined,
          newPosts: props.fetchPostType === 'newPosts' ? true : undefined,
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
    if (newPost)
    {
    setListPost([newPost].concat(listPost))
  }
  }, [newPost]);
 
  return (
    <Wrapper noMarginTop = {props.noMarginTop} isMobile = {isMobile}>
      <PageAnimate>
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
                {listPost.map((post) =>
                   <Post postData = {post} key = {post._id}/>
                )}
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
      </PageAnimate>
    </Wrapper>
  );
};

const Wrapper = styled.div<StyledWrapperType>`
  .posts {
    margin: 0 auto;
    margin-top: ${props => props.noMarginTop ? '20px' : '50px'};
    
    .post {
      background-color: var(--white-color);
      margin: 0 auto 20px;
      border-radius: 4px;
      padding: 12px;
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
        .post-group{
          width: ${props => props.isMobile ? '100%' : '540px'};
          margin: 0 auto;
        }
        .post-content {
          font-size: 14px;
          font-weight: 500;
          margin: 12px 0;
        }
        .photo {
          .image {
            width: ${props => props.isMobile ? '100%' : '540px'};
            height: ${props => props.isMobile ? '330px' : '540px'};
            object-position: center;
            object-fit: cover;
            border-radius: ${props => props.isMobile ? '6px' : '12px'};
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
  }
`;

export default NewsFeed;
