import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { useAppSelector } from "app/hooks";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";

type Props = {};

const Wrapper = styled.div`
  .skeleton{

  }

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

    .navigate {
      display: flex;
      .slide-skills-prev,
      .slide-skills-next {
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

  .game{
    text-align: center;
    height: 180px;
    border-radius: 18px;
    p{
        font-weight: 600;
        font-size: 13px;
    }

    .image{
        padding: 7px;
        display: flex;
        justify-content: center;
        img{
        width: 142px;
        height: 142px;
        overflow: hidden;
    }
    }

    &:hover{
        background-color: var(--primary-color);
        color: var(--white-color);
    }
    &:hover .image{
        transform: scale(1.04)
    }
  }
`;
const SlideSkills = (props: Props) => {
  const { listGame } = useAppSelector((state) => state);
  const gameArray = listGame.listGame;


  return (
    <Wrapper>
      <div className="slide-header">
        <h1>Find Player by Game</h1>
        <div className="navigate">
          <button className="slide-skills-prev">
            <FaAngleLeft />
          </button>
          <button className="slide-skills-next">
            <FaAngleRight />
          </button>
        </div>
      </div>
      {<Swiper
        slidesPerView={7}
        slidesPerGroup={7}
        spaceBetween={0}
        loop={true}
        navigation={{
          nextEl: ".slide-skills-next",
          prevEl: ".slide-skills-prev",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {listGame.loading ? Array(15).fill(0).map((item, i)=>  <SwiperSlide key={i}>
            <div className="skeleton">
              <Skeleton width={142} height={142}/>
            </div>
          </SwiperSlide>) : gameArray && gameArray.map((game, i) => (
          <SwiperSlide key={i}>
            <Link to = {`/skill/${game.slug}`}>
              <div className="game">
                  <div className="image">
                  <img src={game.pcImageUrl} alt={game.name} />
                  </div>
                  <p>{game.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>}
    </Wrapper>
  );
};

export default SlideSkills;
