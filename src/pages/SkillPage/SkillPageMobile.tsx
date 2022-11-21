import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetSkillsQuery } from "redux/skills/skillsSlice";
import { InfiniteScroll, LoadingIcon, PageAnimate } from "components/index";
import images from "assets/images";
import { FaChevronLeft } from "react-icons/fa";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {};

const Wrapper = styled.div`
  .skills-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    img {
      width: 28px;
      height: 28px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-left: 10px;
    }

    .btn-back{
        position: absolute;
        top: 14px;
        left: 20px;
        svg{
            font-size: 20px;
            color: #333;
        }
    }
  }

  .skills-body {
    .skill {
      margin: 0;
      margin-top: 10px;
      .skill-body {
        overflow: hidden;
        border-radius: 8px;
        background-color: var(--white-color);
        transition: all 0.4s;
        .skill-left {
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            transition: all 0.4s;
          }
        }
        .skill-right {
          flex: 1;
          padding: 5px 10px;
          .nickname {
            font-weight: 600;
            font-size: 16px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .intro {
            font-size: 15px;
            color: #333;
            font-weight: 500;
            margin-top: 16px;
          }

          .skill-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              display: flex;
              align-items: center;
              font-size: 12px;
              span {
                color: var(--yellow-color);
                font-size: 14px;
                font-weight: 600;
              }
              img {
                width: 16px;
                height: 16px;
              }
            }
            .ratting {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
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

const SkillPageMobile = (props: Props) => {
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
      <div className="skills-page wide">
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
            <Link to = "/">
                <button className="btn-back">
                    <FaChevronLeft />
                </button>
            </Link>
          </div>
        )}

        {skills.length === 0 ? (
          <div className="skills-body">
            <div className="row">
              {Array(10)
                .fill(0)
                .map((item, index) => (
                  <div key={index} className="skill col l-6 c-6">
                    <div className="skill-body">
                      <div className="skill-left">
                        <Skeleton width={204} height={204} />
                      </div>

                      <div className="skill-right">
                        <div className="nickname">
                          <Skeleton width={160} height={40} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <PageAnimate>
            <div className="skills-body">
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
                    <div className="skill col l-6 c-6" key={index}>
                      <Link to={`/user/${skill.userId}`}>
                        <div className="skill-body">
                          <div className="skill-left">
                            <img src={skill.avatarUrl} alt="avatar" />
                          </div>
                          <div className="skill-right">
                            <div className="nickname">{skill.nickname}</div>
                            {/* <div className="intro">{skill.intro}</div> */}
                            <div className="skill-bottom">
                              <div className="price">
                                <img src={images.coin} alt="coin" />
                                <span>{skill.price}</span>/Trận
                              </div>
                              <div className="ratting">
                                <img src={images.star} alt="" />
                                <span>5.00</span>
                                {`(${Math.floor(Math.random() * 150)})`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </PageAnimate>
        )}
      </div>
    </Wrapper>
  );
};

export default SkillPageMobile;
