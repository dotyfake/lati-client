import { useAppSelector } from "app/hooks";
import { Link } from "react-router-dom";
import FieldUser from "redux/user/accountSlice/FieldUser";
import styled from "styled-components";
import Photos from "./components/Photos";
import UploadAvatar from "./components/UploadAvatar";

import {
    FaChevronLeft,
  } from "react-icons/fa";
import { PageAnimate } from "components/index";
import SkillsMobile from "./components/SkillsMobile";

type Props = {};

const Wrapper = styled.div`
  background-color: #f9f9f9;
  
  h1 {
    font-size: 1.6rem;
    text-align: center;
    padding: 14px;
  }
  .user-info {
    margin: 0 auto;
    width: 90vw;

    .back{
        position: fixed;
        top: 20px;
        left: 10px;
        svg{
            font-size: 1.8rem;
            color: #333;
        }
    }

    .avatar-column,
    .wrapper {
      background-color: var(--white-color);
      border-radius: 8px;
    }

    .info {
      .wrapper {
        padding: 14px;
      }
    }
  }

`;

const AccountMobile = (props: Props) => {
  const { login } = useAppSelector((state) => state);

  const userInfo = login.userInfo;

  return (
    <Wrapper>
      <PageAnimate>
          <div className="user-info ">
          <Link to = "/">
              <button className="back">
                <FaChevronLeft />
              </button>
            </Link>
            <h1>Edit profile</h1>
            <div className="row">
              <div className="avatar-column col l-4 c-12">
                <UploadAvatar />
                <Photos/>
              </div>
              <div className="info col l-8 c-12">
                <div className="wrapper">
                  <FieldUser
                    title="Nickname"
                    value={userInfo?.displayName}
                    name="displayName"
                  />
                  <FieldUser title="Age" value={userInfo?.age} name="age" />
                  <FieldUser title="Bio" value={userInfo?.bio} name="bio" />
                  <FieldUser
                    title="Gender"
                    value={userInfo?.gender}
                    name="gender"
                  />
                </div>
               <SkillsMobile />
              </div>
            </div>
          </div>
      </PageAnimate>
    </Wrapper>
  );
};

export default AccountMobile;
