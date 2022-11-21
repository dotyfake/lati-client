import React, { useState, useEffect } from "react";
import styled from "styled-components";
import images from "assets/images";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Tabs from "./components/Tabs";
import { copyToClipboard } from "utils/copyToClipboard";
import ViewImage from "components/ViewImage";

//redux
import { UserInfo, setUserInfo } from "redux/user/loginSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useGetUserQuery } from "redux/user/userDetailSlice";
import { useUpdateUserFollowingMutation } from "redux/user/accountSlice/accountSlice";

//icon
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegCopy,
  FaUserCheck,
  FaUserPlus,
  FaChevronLeft,
} from "react-icons/fa";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import PageAnimate from "components/PageAnimate";

type Props = {};

const UserDetail = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const params = useParams();

  const [userDetail, setUserDetail] = useState<UserInfo>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [photos, setPhotos] = useState<string[]>();
  const [followStatus, setFollowStatus] = useState<boolean>(false);
  const { userId } = useParams();

  const { data: dataUserDetail } = useGetUserQuery(userId as string);

  const [updateUserFollowing, { data: dataUserFollowing }] =
    useUpdateUserFollowingMutation();

  const handleUpdateUserFollowing = () => {
    const action = followStatus ? "unfollow" : "follow";
    if (login.userInfo)
      updateUserFollowing({
        accessToken: login.userInfo?.accessToken,
        action: action,
        followingUserId: params.userId as string,
      });
  };

  useEffect(() => {
    if (login.userInfo)
      dispatch(setUserInfo({ ...login.userInfo, ...dataUserFollowing }));
  }, [dataUserFollowing]);

  useEffect(() => {
    if (login.userInfo) {
      setFollowStatus(
        login.userInfo.following?.includes(params.userId as string) as boolean
      );
    }
  }, [login.userInfo]);

  useEffect(() => {
    if (userDetail) {
      const mapPhotos = userDetail.photos.map((photo, i) => photo.photoUrl);
      setPhotos([userDetail.avatar.avatarUrl, ...mapPhotos]);
    }
  }, [userDetail]);

  useEffect(() => {
    if (dataUserDetail) {
      setUserDetail(dataUserDetail);
    }
  }, [dataUserDetail]);

  return (
    <Wrapper>
      <PageAnimate>
        <Link to = "/">
          <button className="back">
            <FaChevronLeft />
          </button>
        </Link>
        {userDetail && photos && (
          <div className="grid wide">
            <div className="user-header">
              <div className="header-left">
                <div className="header-avatar">
                  <img src={userDetail.avatar.avatarUrl} alt="avatar" />
                </div>
                <div>
                  <div className="nickname">
                    {userDetail.displayName}
                    <span>
                      <img src={images.girl} alt="age" />
                      20
                    </span>
                  </div>
                  <div className="id">
                    <img src={images.id} alt="" />
                    <span>{userDetail.username}</span>
                    <button
                      onClick={() => {
                        toast.success("Id copied!");
                        copyToClipboard(userDetail.username);
                      }}
                    >
                      <FaRegCopy />
                    </button>
                  </div>
                </div>
              </div>
              {params.userId !== login.userInfo?.id && (
                <div className="follow">
                  {followStatus ? (
                    <button
                      onClick={handleUpdateUserFollowing}
                      className="following"
                    >
                      <FaUserCheck />
                      Following
                    </button>
                  ) : (
                    <button onClick={handleUpdateUserFollowing}>
                      <FaUserPlus />
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="user-body">
              <div className="row no-gutters">
                <div className="body-left col l-4 c-12">
                  <div className="photos">
                    <div className="main-photo">
                      <Swiper
                        loop
                        modules={[Thumbs, Navigation]}
                        slidesPerView={1}
                        spaceBetween={0}
                        thumbs={{
                          swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                              ? thumbsSwiper
                              : null,
                        }}
                        className="slider-images"
                      >
                        {photos &&
                          photos.map((item, i) => (
                            <SwiperSlide
                              key={i}
                              //  onClick={() => showPhoto(item)}
                            >
                              <ViewImage src={item} alt={""} />
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                    {photos.length > 1 && (
                      <div className="thumbs-swiper">
                        <button className="btn-navigation prev-photos">
                          <FaAngleLeft />
                        </button>
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          modules={[Thumbs, Navigation]}
                          loop
                          navigation={{
                            nextEl: ".next-photos",
                            prevEl: ".prev-photos",
                          }}
                          slidesPerGroup={4}
                          breakpoints={{
                            100: {
                              slidesPerView: 4,
                              spaceBetween: 8,
                            },
                            1000: {
                              slidesPerView: 4,
                              spaceBetween: 8,
                            },
                          }}
                          className="slider-thumbs"
                        >
                          {photos &&
                            photos.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="photo">
                                  <img src={item} alt="images" />
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                        <button className="btn-navigation next-photos">
                          <FaAngleRight />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="bio">
                    <h2>Bio</h2>
                    <p>{userDetail.bio}</p>
                  </div>
                </div>
                <div className="body-right col l-8 c-12">
                  <div className="content">
                    <Tabs skills={userDetail.skills} />
                    <div className="user-review"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageAnimate>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .back {
    position: fixed;
    color: #333;
    font-size: 20px;
    left: 5px;
    top: 5px;
    z-index: 99999;
  }
  .user-header {
    background-color: var(--white-color);
    border-radius: 14px;
    justify-content: space-between;
    padding: 12px;
    position: relative;
    margin-top: 10px;
    .header-left {
      display: flex;
      align-items: center;

      .header-avatar {
        margin-right: 18px;
        img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .nickname {
        font-size: 18px;
        color: #333;
        font-weight: 700;
        margin-bottom: 6px;
        display: flex;

        span {
          background-color: #ff70a2;
          color: var(--white-color);
          font-size: 10px;
          display: flex;
          height: 16px;
          align-items: center;
          border-radius: 4px;
          padding: 0 5px;
          margin-left: 10px;
          margin-top: 6px;
          img {
            width: 10px;
            height: 10px;
            margin-right: 2px;
          }
        }
      }
      .id {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
        font-weight: 500;
        img {
          width: 14px;
          height: 14px;
          margin-right: 2px;
        }
        svg {
          margin-left: 2px;
          color: #d3d3d3;
          font-size: 14px;
          cursor: pointer;
        }
        span {
          margin: 0 3px;
        }
      }
    }
    .follow {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      right: 10px;
      .following {
        border: 1px solid var(--success-color);
        svg {
          color: var(--success-color);
        }
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        height: 30px;
        padding: 0 6px;
        font-size: 13px;
        font-weight: 400;
        color: #4f5a69;
        border: 1px solid #4f5a69;

        svg {
          margin-right: 6px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .user-body {
    margin-top: 16px;
    .body-left {
      background-color: var(--white-color);
    }
    .photos {
      .main-photo {
        img {
          width: 100%;
          height: 360px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
        }
      }
      .thumbs-swiper {
        display: flex;
        margin-top: 10px;
        padding: 0 5px;
        .btn-navigation {
          width: 24px;
          height: 72px;
          border-radius: 2px;
          background-color: #f0f0f0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          svg {
            color: #333;
            font-weight: 500px;
            font-size: 15px;
          }
        }

        .next-photos {
          margin-left: 5px;
        }

        .prev-photos {
          margin-right: 5px;
        }

        .photo {
          img {
            width: 72px;
            height: 72px;
            border-radius: 2px;
            object-fit: cover;
            cursor: pointer;
          }
        }
      }
    }
    .bio {
      margin-top: 30px;
      padding: 20px;
      h2 {
        color: #333;
        font-size: 20px;
        font-weight: 600;
      }
      p {
        color: #333;
        font-size: 13px;
        font-weight: 600;
        margin-top: 10px;
      }
    }

    .body-right {
      margin-top: 20px;
      .content {
      }
    }
  }
`;

export default UserDetail;
