import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useGetSkillsQuery } from "redux/skills/skillsSlice";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {CloudinaryImage} from '@cloudinary/url-gen'
import {Resize} from '@cloudinary/url-gen/actions/resize';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import images from "assets/images";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  slug: string;
  title: string;
};

const Wrapper = styled.div`
  margin: 40px 0;
  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h1 {
      color: #160c32;
      font-size: 1.2rem;
      font-weight: 700;
    }

    span {
      margin-left: 5px;
      color: var(--primary-color);
    }

    .navigate {
      display: flex;

      a {
        display: flex;
        align-items: center;
      }

      .see-all {
        font-weight: 600;
        margin-right: 20px;

        &:hover {
          text-decoration: underline;
        }
      }

      .btn-navigate,
      .slide-players-prev,
      .slide-players-next {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #999;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        transition: all 0.3s;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .mySwiper {
    padding: 16px;
  }
`;
const Player = styled.div`
  .player {
    background-color: var(--white-color);
    height: 320px;
    border-radius: 14px;
    overflow: hidden;
    transition: all 0.4s;
    .image {
      overflow: hidden;
      img {
        transition: all 0.4s;
        width: 206px;
        height: 258px;
        object-fit: cover;
      }
    }
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
      .image {
        img {
          transform: scale(1.2);
        }
      }
    }
  }
  .info {
    padding: 8px;
    .nickname {
      color: #333;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
      p {
        color: #ff9b00;
        font-size: 18px;
        font-weight: 600;
      }
      span {
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
`;

const RecommendPlayers = (props: Props) => {
  const [listPlayer, setListPlayer] = useState<any[]>([
    "Skeleton-1",
    "Skeleton-2",
    "Skeleton-3",
    "Skeleton-4",
    "Skeleton-5",
  ]);

  const { data, isFetching } = useGetSkillsQuery({
    slug: props.slug,
  });

  useEffect(() => {
    if (data) setListPlayer(data.skills);
  }, [data]);

  if (!listPlayer) return <div></div>;

  return (
    <Wrapper>
      <div className="slide-header">
        <h1>
          <Link to={`/skill/${props.slug}`}>
            <span>{props.title}</span>
          </Link>
        </h1>
        <div className="navigate">
          <Link to={`/skill/${props.slug}`}>
            <span className="see-all">See All</span>
          </Link>
          <button className={`btn-navigate slide-players-prev-${props.slug}`}>
            <FaAngleLeft />
          </button>
          <button className={`btn-navigate slide-players-next-${props.slug}`}>
            <FaAngleRight />
          </button>
        </div>
      </div>
      <div className="slide-body">
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={18}
          loop={true}
          navigation={{
            nextEl: `.slide-players-next-${props.slug}`,
            prevEl: `.slide-players-prev-${props.slug}`,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {listPlayer.length < 1
            ? listPlayer.map((player, i) => (
                <SwiperSlide key={i}>
                  <Player>
                    <div className="player">
                      <div className="image">
                        <Skeleton width={206} height={206} />
                      </div>
                      <div className="info">
                        <Skeleton count={2} />
                      </div>
                    </div>
                  </Player>
                </SwiperSlide>
              ))
            : listPlayer.map((player, i) => {
              let result
              if(player.avatarUrl){
                let str = player.avatarUrl.replace('https', 'http');
                let position = 49;
                let sub = "w_206,h_258,c_fill/";
  
                result = str.slice(0, position )  + sub + str.slice(position) ;
              }
              
             return (<SwiperSlide key={i}>
                  <Link to={`/user/${player.userId}`}>
                    <Player>
                      <div className="player">
                        <div className="image">
                          <img src={result} alt={player.name} />
                        </div>
                        <div className="info">
                          <p className="nickname">{player.nickname}</p>
                          <div className="price">
                            <img src={images.coin} alt="" />
                            <p>{player.price}</p>
                            <span>/Trận</span>
                          </div>
                        </div>
                      </div>
                    </Player>
                  </Link>
                </SwiperSlide>)
              
            })}
        </Swiper>
      </div>
    </Wrapper>
  );
};

export default RecommendPlayers;
