import { useState, useEffect } from 'react';
import styled from "styled-components";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { SkillType } from "utils/interfaces";
import images from 'assets/images';
import NewsFeed from 'pages/Posts/components/NewsFeed';
import { Link, useParams } from 'react-router-dom';

type Props = {
  skills: SkillType[];
};

const Tabs = (props: Props) => {
  const [tabActive, setTabActive] = useState("Skills");
  const [currentSkill, setCurrentSkill] = useState<SkillType>();

  const setCurrentTab = (e: React.MouseEvent<HTMLElement>) => {
    setTabActive((e.target as Element).innerHTML);
  };

  const params = useParams()

  useEffect(()=> {
    if(!currentSkill)
    setCurrentSkill(props.skills[0])
  },[currentSkill])

  return (
    <Wrapper>
      <div className="tabs">
        <button
          className={tabActive === "Skills" ? "btn active" : "btn"}
          onClick={setCurrentTab}
        >
          Skills
        </button>
        <button
          className={tabActive === "Posts" ? "btn active" : "btn"}
          onClick={setCurrentTab}
        >
          Posts
        </button>
      </div>
      {tabActive === "Skills" && <div>
        <div className="skills">
          <button className="btn prev-skill"><FaAngleLeft /></button>
          <Swiper
            modules={[Navigation]}
            freeMode = {true}
            navigation={{
              nextEl: ".next-skill",
              prevEl: ".prev-skill",
            }}
            className="swiper"
            style = {{width: `${props.skills.length > 3 ? "100%" : `${props.skills.length * 25}%`}`}}
            breakpoints={{
              100: {
                slidesPerView: props.skills.length > 1 ? 2 : props.skills.length,
                spaceBetween: 5,
                slidesPerGroup: props.skills.length > 1 ? 2 : props.skills.length,
              },
              1000: {
                slidesPerView: props.skills.length > 4 ? 5 : props.skills.length,
                spaceBetween: 10,
                slidesPerGroup: props.skills.length > 4 ? 5 : props.skills.length,
              },
            }}
          >
            {props.skills.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className={currentSkill?.name === item.name ? "skill active" : "skill"}
                  style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${item.bannerUrl}) no-repeat center / cover`,
                  }}
                  onClick={() => setCurrentSkill(item)}
                >
                  <p>{item.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="btn next-skill"><FaAngleRight /></button>
        </div>
        <div className="skill-info">
          <div className="name">
            <h2>{currentSkill?.name}</h2>
        </div>
            <div className="price">
                  <img src={images.coin} alt="coin" />
                  <span>{currentSkill?.price}</span> /Trận
            </div>
            <p className="intro">
              {currentSkill?.intro}
            </p>
            <div className="buttons">
              <button className="btn order">Order</button>
              <Link to= {`/chat/${params.userId}`}>
                <button className="btn chat">
                    <img src={images.chatEmo} alt="chat" />
                    Chat</button>
              </Link>
            </div>
          </div>
      </div>}
      {
        tabActive === "Posts" && <NewsFeed fetchPostType='profile' newPost={undefined} noMarginTop isMobile />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .tabs {
    display: flex;

    .btn {
      color: #333;
      font-size: 20px;
      font-weight: 600;
      margin: 0 20px;
      position: relative;

      &.active {
        color: var(--primary-color);
        &::after {
          content: "";
          display: block;
          height: 3px;
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 2px;
          background-color: var(--primary-color);
        }
      }
    }
  }
  .skills{
    margin-top: 24px;
    display: flex;
    align-items: center;

    .btn{
        svg{
            font-size: 30px;
            color: var(--primary-color)
        }
    }
  }
  .skill {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 42px;
    padding-left: 6px;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    p {
      color: var(--white-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      font-weight: 600;
    }

    &.active{
        border: 3px solid var(--primary-color);
    }
  }

  .skill-info{
    background-color: var(--white-color);
    margin-top: 24px;
    padding: 20px;

    .name{
        color: #333;
      font-size: 22px;
      font-weight: 600;
    }

    .price{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        margin-top: 10px;

        img{
            width: 20px;
            height: 20px;
        }

        span{
            color: var(--yellow-color);
            font-size: 18px;
            font-weight: 600;
            margin-right: 5px;
        }

    }

    .intro{
      margin-top: 10px;
    }
    .buttons{
        margin-top: 24px;
        display: flex;

        .btn{
            width: 200px;
            height: 56px;
            border-radius: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white-color);
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
        }

        .order{
            background-image: linear-gradient(90deg,#FFDE00, #FFB500)
        }

        .chat{
            background-image: linear-gradient(90deg,#9281FF, #552BFF);
            margin-left:18px;
            img{
                width: 22px;
                height: 22px;
                margin-right: 6px;
            }
        }
    }
  }
`;

export default Tabs;
