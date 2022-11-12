import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import { UserInfo, setUserInfo } from "redux/user/loginSlice";
import images from "assets/images";
import { SkillType } from "utils/interfaces";
import { FaPlusCircle } from "react-icons/fa";
import { useCreateSkillMutation } from "redux/skills/skillsSlice";
import toastError from "utils/toastError";
import AccountSkill from "redux/skills/components/AccountSkill";
type Props = {};

const Wrapper = styled.div`
  margin-top: 20px;
  background-color: var(--white-color);
  border-radius: 8px;
  padding: 20px;

  .skills-header {
    display: flex;
    justify-content: center;
    .become-player {
      margin-bottom: 20px;
      padding: 10px;
      background-image: rgb(226 232 240 / var(--tw-bg-opacity));
      transition: all 0.2s;

      img {
        height: 50px;
      }

      &:hover {
        color: white;
        background-image: linear-gradient(0, #e29ec0, #bdace4);
      }
    }
  }

  .create-skill {
    border: 4px solid var(--primary-color);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .skill-body {
      width: 80%;
    }

    .skill-select {
      display: flex;
      align-items: center;
      justify-content: center;

      label {
        margin-right: 5px;
        font-weight: 500;
      }

      img {
        margin-left: 10px;
        height: 33px;
      }
    }

    input,
    textarea,
    select {
      border: #999 1px solid;
      padding: 5px;
      width: 100%;
      border-radius: 8px;

      &:focus {
        outline: 1px solid var(--primary-color);
      }
    }

    select {
      cursor: pointer;
      width: auto;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      border-radius: 20px;
      padding: 10px;
      color: var(--white-color);
      background-color: var(--primary-color);

      svg {
        margin-right: 5px;
      }

      &:hover,
      &:active {
        filter: brightness(1.2);
      }
    }

    .skill-intro,
    .skill-price {
      display: flex;
      margin-top: 10px;
      label {
        display: inline-block;
        width: 70px;
        font-weight: 500;
      }
    }
  }
`;

const Skills = (props: Props) => {
  //redux state
  const dispatch = useAppDispatch();
  const { login, listGame } = useAppSelector((state) => state);
  const userInfo = login.userInfo as UserInfo;
  const [createSkill, { data, isError, error, isSuccess }] =
    useCreateSkillMutation();

  //components state
  const [showAddSkillElement, setShowAddSkillElement] =
    useState<boolean>(false);
  const [currentValueSelected, setCurrentValueSelected] =
    useState("DEFAULT VALUE");
  const [hasSkills, setHasSkills] = useState(false);
  const [skillDetail, setSkillDetail] = useState<SkillType>({
    avatarUrl: userInfo.avatar,
    gender: userInfo.gender,
    nickname: userInfo.displayName,
    bannerUrl: "",
    name: "",
    iconUrl: "",
    slug: "",
    intro: "Game nào tuôi cũng chơi, người nào tuôi cũng gánh :3",
    price: 150,
  });

  const show = () => {
    setShowAddSkillElement(true);
  };

  const handleCreateSkill = () => {
    if (skillDetail.name) {
      const payload = {
        accessToken: login.userInfo?.accessToken,
        skillDetail,
      };
      createSkill(payload);
    }
  };


  useEffect(() => {
      console.log('re-render');
      setSkillDetail((prev) => ({
        ...prev,
        avatarUrl: userInfo.avatar,
        nickname: userInfo.displayName,
      }));
  }, [userInfo.avatar]);

  useEffect(() => {
    if (userInfo.skills.length > 0) {
      setHasSkills(true);
    }
  }, [login.loading, userInfo]);

  useEffect(() => {
    if (userInfo.skills.length > 0) {
      setShowAddSkillElement(true);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toastError(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUserInfo({ ...login.userInfo, skills: data.skills } as UserInfo)
      );
    }
  }, [isSuccess, data]);
  return (
    <Wrapper>
      {!hasSkills ? (
        <div className="skills-header">
          <button
            className="become-player flex items-center bg-slate-200 rounded"
            onClick={show}
          >
            Become Player
            <img src={images.player} alt="player" />
          </button>
        </div>
      ) : (
        <div>
          <h1>Skills</h1>
        </div>
      )}
      <div className="list-skill">
        {login.userInfo?.skills.map((skill, index) => (
          <AccountSkill key={index} skill={skill} />
        ))}
      </div>
      {showAddSkillElement && (
        <div className="create-skill">
          <div className="skill-body">
            <div className="skill-select">
              <label htmlFor="select-skill">Select skill</label>
              <select
                name="rental-option"
                defaultValue={currentValueSelected}
                onChange={(e) => {
                  const skillOption = JSON.parse(e.target.value);
                  setCurrentValueSelected(e.target.value);
                  setSkillDetail({ ...skillDetail, ...skillOption });
                }}
              >
                <option value={currentValueSelected} disabled>
                  --Choose here--
                </option>
                {listGame.listGame.map((skill, index) => (
                  <option
                    value={JSON.stringify({
                      name: skill.name,
                      slug: skill.slug,
                      bannerUrl: skill.bannerUrl,
                      iconUrl: skill.iconUrl,
                    })}
                    key={index}
                  >
                    {skill.name}
                  </option>
                ))}
              </select>
              <img src={skillDetail.iconUrl} alt="" />
            </div>
            <div className="skill-intro">
              <label>Intro:</label>
              <textarea
                value={skillDetail.intro}
                onChange={(e) =>
                  setSkillDetail({ ...skillDetail, intro: e.target.value })
                }
              />
            </div>
            <div className="skill-price">
              <label>Price:</label>
              <input
                type="number"
                value={skillDetail.price}
                onChange={(e) =>
                  setSkillDetail({ ...skillDetail, price: +e.target.value })
                }
              />
            </div>
          </div>
          <button onClick={handleCreateSkill}>
            <FaPlusCircle />
            Add Skill
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Skills;
