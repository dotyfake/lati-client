import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetSkillsQuery } from "redux/skills/skillsSlice";
import { InfiniteScroll, LoadingIcon } from "components/index";
import images from "assets/images";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {};


const Wrapper = styled.div`
  width: var(--max-w);
  margin: 100px auto 30px;

  .skills-header {
    display: flex;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
    }
    .title {
      font-size: 22px;
      font-weight: 600;
      color: #333;
      margin-left: 10px;
    }
  }

  .skills-body {
    .skill {
      height: 200px;
      margin: 0;
      margin-top: 20px;
      .skill-body {
        display: flex;
        overflow: hidden;
        border-radius: 8px;
        background-color: var(--white-color);
        transition: all 0.4s;
        .skill-left {
          overflow: hidden;
          img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            transition: all 0.4s;
          }
        }
        .skill-right {
          flex: 1;
          padding: 20px;
          position: relative;
          .nickname {
            font-weight: 600;
            font-size: 18px;
          }
          .intro {
            font-size: 15px;
            color: #333;
            font-weight: 500;
            margin-top: 16px;
          }
          .price {
            position: absolute;
            display: flex;
            align-items: center;
            left: 16px;
            bottom: 16px;
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
`;

const EndMessage = styled.p`
  text-align: center;
  font-weight: 600;
  color: #333;
  font-size: 16px;
  margin-top: 30px;
`;

const SkillPage = (props: Props) => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [skills, setSkills] = useState<any[]>([]);

  const params = useParams();

  const { data } = useGetSkillsQuery({
    slug: params.slug as string,
    page: page,
  });

  useEffect(() => {
    if (data) {
      const skillsData = data.skills;
      setSkills([...skills, ...skillsData]);
      setTotalRows(data.countSkill);
    }
  }, [data]);

  return (
    <Wrapper>
      {skills.length === 0 ? (
        <div className="skills-header">
          <Skeleton width={44} height={44} />
          <div className="title">
            <Skeleton width={260} height={30} />
          </div>
        </div>
      ) : (
        <div className="skills-header">
          <div className="icon">
            <img src={skills[0].iconUrl} alt={skills[0].name} />
          </div>
          <div className="title">{skills[0].name}</div>
        </div>
      )}

     {skills.length === 0 ? <div className="skills-body">
      <div className="row">
        {Array(10).fill(0).map((item, index)=> <div key={index} className="skill col l-6 c-12">
          <div className="skill-body">
            <div className="skill-left">
              <Skeleton width={204} height={204}/>
            </div>
            <div className="skill-right">
              <div className="nickname">
              <Skeleton width={160} height={40}/>
              </div>
              <div className="intro">
              <Skeleton width={220} height={40}/>
              </div>
              <div className="price">
              <Skeleton width={120} height={40}/>
              </div>
            </div>
          </div>
        </div>)}
      </div>
     </div> : <div className="skills-body">
        <InfiniteScroll
          loader={
            <div className="flex justify-center">
              <LoadingIcon />
            </div>
          }
          fetchMore={() => setPage((prev) => prev + 1)}
          hasMore={skills.length < totalRows}
          endMessage={<EndMessage>You have seen it all</EndMessage>}
        >
          <div className="row">
            {skills.map((skill, index) => (
              <div className="skill col l-6 c-12" key={index}>
                <Link to={`/user/${skill.userId}`}>
                  <div className="skill-body">
                    <div className="skill-left">
                      <img src={skill.avatarUrl} alt="avatar" />
                    </div>
                    <div className="skill-right">
                      <div className="nickname">{skill.nickname}</div>
                      <div className="intro">{skill.intro}</div>
                      <div className="price">
                        <img src={images.coin} alt="coin" />
                        <span>{skill.price}</span>/Trận
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>}
    </Wrapper>
  );
};

export default SkillPage;
