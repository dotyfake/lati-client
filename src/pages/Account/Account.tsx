import { useAppSelector } from "app/hooks";
import FieldUser from "redux/user/accountSlice/FieldUser";
import styled from "styled-components";
import Photos from "./components/Photos";
import Skills from "./components/Skills";
import UploadAvatar from "./components/UploadAvatar";

type Props = {};

const Wrapper = styled.div`
  margin-top: calc(var(--header-height));
  background-color: #f9f9f9;
  
  h1 {
    font-size: 2.4rem;
    text-align: center;
    padding: 14px;
  }
  .user-info {
    margin: 0 auto;
    width: 90vw;
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

const Account = (props: Props) => {
  const { login } = useAppSelector((state) => state);

  const userInfo = login.userInfo;

  return (
    <Wrapper>
      <div className="user-info ">
        <h1>Edit profile</h1>
        <div className="row">
          <div className="avatar-column col l-4 c-12">
            <UploadAvatar />
            <Photos />
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
           <Skills />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Account;
