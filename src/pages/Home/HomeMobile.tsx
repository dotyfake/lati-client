import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import images from "assets/images";
import { HeaderMobile, LoadingIcon, PageAnimate } from "components/index";
import Sad from "components/layouts/Header/components/Sad";
import InfiniteScroll from "components/InfiniteScroll";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useGetAllUserQuery } from "redux/user/userDetailSlice";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getListGame } from "redux/games/listGameSlice";
import MoreGame from "./components/mobile/MoreGame";
import { AnimatePresence } from "framer-motion";
import { Button } from "components/layouts/Header/components";
type Props = {};

const tabs = [
  { name: "Home", image: images.home, navigate: "/" },
  { name: "Posts", image: images.posts, navigate: "/posts/new" },
  { name: "Chat", image: images.chat, navigate: "/chat" },
  { name: "Account", image: images.profile, navigate: "/account" },
];

const HomeMobile = (props: Props) => {
  const { listGame } = useAppSelector((state) => state);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [showMoreGames, setShowMoreGames] = useState(false)
  const dispatch = useAppDispatch();

  const { data } = useGetAllUserQuery({
    page: page,
  });

  useEffect(() => {
    if (listGame.listGame.length < 1) {
      dispatch(getListGame());
    }
  }, []);

  useEffect(() => {
    if (data) {
      const usersData = data.users;
      setUsers([...users, ...usersData]);
      setTotalRows(data.countUsers);
    }
  }, [data]);

  return (
      <Wrapper >
        <div style={{display: 'none'}}><Button /></div>
        <HeaderMobile />
    <PageAnimate>
        <div className="container wide">
          <div className="heading">
            <h2>Popular Services</h2>
          </div>
          <div className="skill">
            {listGame.listGame.length > 0 ? (
              <div className="row">
                {listGame.listGame.slice(0, 7).map((game, i) => (
                  <div className="game col c-3" key={i}>
                    <Link to={`skill/${game.slug}`}>
                      <div className="image">
                        <img src={game.mainIconUrl} alt="" />
                      </div>
                      <p>{game.name}</p>
                    </Link>
                  </div>
                ))}
                <div className="game col c-3 flex justify-center items-center">
                  <button onClick={()=> setShowMoreGames(true)}>
                    <div className="image">
                      <img src={images.more} alt="" />
                    </div>
                    <p>More</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                {Array(8)
                  .fill(0)
                  .map(() => (
                    <div className="game col c-3">
                      <div className="image">
                        <Skeleton width={64} height={64} />
                      </div>
                      <Skeleton width={80} />
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="players">
            <div className="heading">
              <h2>Top Gaming Buddy for You</h2>
            </div>
            {users.length > 0 ? (
              <InfiniteScroll
                loader={
                  <div className="flex justify-center">
                    <LoadingIcon />
                  </div>
                }
                fetchMore={() => setPage((prev) => prev + 1)}
                hasMore={users.length < totalRows}
                endMessage={<Sad content="You have seen it all"></Sad>}
              >
                <div className="row">
                  {users.map((skill, i) => (
                    <div className="skill col l-6 c-12" key={i}>
                      <Link to={`/user/${skill._id}`}>
                        <div className="skill-body">
                          <div className="skill-left">
                            <img src={skill.avatar.avatarUrl} alt="avatar" />
                          </div>
                          <div className="skill-right">
                            <div className="right-top">
                            <div className="nickname">{skill.displayName}</div>
                            <div className="ratting">
                              <img src={images.star} alt="" />
                              <span>5.00</span>
                              {`(${Math.floor(Math.random() * 150)})`}
                            </div>
                            </div>
                            <div className="intro">{skill.bio}</div>
                            <div className="game">
                              <img src={skill.skills[0].iconUrl} alt="" />
                              {skill.skills[0].name}
                            </div>
                            <div className="price">
                              <img src={images.coin} alt="coin" />
                              <span>{skill.skills[0].price}</span>/Trận
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="row">
                {Array(10)
                  .fill(0)
                  .map(() => (
                    <div className="skill col l-6 c-12">
                      <div className="skill-body">
                        <div className="skill-left">
                          <Skeleton width={120} height={136} />
                        </div>
                        <div className="skill-right">
                          <Skeleton width={160} />
                          <Skeleton width={220} />
                          <Skeleton width={120} />
                          <Skeleton width={80} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            </div>
          </div>
    </PageAnimate>
          <div className="tabs">
            {tabs.map((tab) => (
              <Link to={tab.navigate} key = {tab.name}>
                <div className="tab-item">
                  <img src={tab.image} alt="tab" />
                </div>
              </Link>
            ))}
          </div>
          <AnimatePresence>{showMoreGames && <MoreGame setShowMoreGames = {setShowMoreGames}/>}</AnimatePresence>
      </Wrapper>
  );
};

const Wrapper = styled.div`
    padding-top: 50px;
  .heading {
    padding-top: 10px;
    h2 {
      font-size: 17px;
      font-weight: 600;
    }
  }
  .game {
    margin-top: 5px;
    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }

    p {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 11px;
      font-weight: 600;
      color: #333;
    }
  }

  .players {
    .heading {
      margin: 20px 0 0;
    }
    .skill {
      margin: 0;
      margin-top: 10px;
      .skill-body {
        display: flex;
        overflow: hidden;
        border-radius: 8px;
        background-color: var(--white-color);
        transition: all 0.4s;
        .skill-left {
          overflow: hidden;
          img {
            border-radius: 8px;
            width: 120px;
            height: 136px;
            object-fit: cover;
            transition: all 0.4s;
          }
        }
        .skill-right {
          flex: 1;
          position: relative;
          margin-left: 10px;
          .right-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .nickname {
              max-width: 160px;
            font-weight: 600;
            font-size: 16px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ratting {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 13px;
              margin-left: 10px;
              span {
                font-weight: 600;
              }
              img {
                width: 12px;
                height: 12px;
                margin-right: 2px;
              }
            }
          }
          
          .intro {
            font-size: 15px;
            color: #333;
            font-weight: 500;
            margin-top: 5px;
            font-size: 13px;

            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            display: -webkit-box;
          }
          .game {
            font-size: 13px;
            font-weight: 600;
            margin-top: 10px;
            display: flex;
            align-items: center;
            background-image: linear-gradient(90deg, #e3ceff, #fff);
            img {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
          .price {
            position: absolute;
            display: flex;
            align-items: center;
            left: 5px;
            bottom: 0;
            span {
              color: var(--yellow-color);
              font-size: 18px;
              font-weight: 600;
            }
            img {
              width: 20px;
              height: 20px;
            }
          }
        }

        &:hover {
          filter: brightness(1.14);
        }

        &:hover img {
          transform: scale(1.1);
        }
      }
    }
  }
  .tabs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #fff;
    z-index: 2000;

    .tab-item {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
`;

export default HomeMobile;
