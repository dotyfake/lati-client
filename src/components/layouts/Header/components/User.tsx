import { useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import HeadlessTippy from "@tippyjs/react/headless";
import { userLogout } from "redux/user/loginSlice";

//icons
import { FaCaretDown, FaSignOutAlt, FaUserCog, FaUserCircle } from "react-icons/fa";

type Props = {};

const Wrapper = styled.div`
  margin-right: 20px;
  button {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    margin-right: 5px;
    object-fit: cover;
  }

  .name {
    font-weight: 500;
  }
  .dropdown {
    width: 150px;
    border-radius: 4px;
    overflow: hidden;
    .option {
      display: flex;
      align-items: center;
      padding: 5px;
      color: #3d3c3c;

      .option-icon {
        margin: 0 10px;
      }

      a {
        display: block;
        width: 100%;
      }
      &:hover {
        background-color: #f4f4f4;
      }

      &:hover .option-icon {
        color: var(--primary-color);
      }
    }
  }
`;
const User = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [dropdownUser, setDropdownUser] = useState(false);
  const navigate = useNavigate()

  const logout = () => {
    dispatch(userLogout());
    navigate('/')
  };
  return (
    <Wrapper>
      <HeadlessTippy
        visible={dropdownUser}
        onClickOutside={() => setDropdownUser(false)}
        interactive={true}
        render={(attrs) => (
          <div className="bg-white shadow-md" tabIndex={-1} {...attrs}>
            <ul className="dropdown">
              <li className="option">
                <Link to="/account">
                  <button onClick={()=> setDropdownUser(false)}>
                  <FaUserCog className="option-icon" />
                  <span>Account</span>
                  </button>
                </Link>
              </li>
              <li className="option">
                <Link to={`/user/${login.userInfo?.id}`}>
                  <button onClick={()=> setDropdownUser(false)}>
                  <FaUserCircle className="option-icon" />
                  <span>Profile</span>
                  </button>
                </Link>
              </li>
              <li className="option">
                <button onClick={logout}>
                  <FaSignOutAlt className="option-icon" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      >
        <button onClick={() => setDropdownUser(true)}>
          <img
            className="avatar"
            src={login.userInfo?.avatar}
            alt="avatar"
          ></img>
          <span className="name">{login.userInfo?.displayName}</span>
          <FaCaretDown />
        </button>
      </HeadlessTippy>
    </Wrapper>
  );
};

export default User;
