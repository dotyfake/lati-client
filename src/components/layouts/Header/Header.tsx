import styled from "styled-components";
import { Navbar, QRCode, Button, User } from "./components";
import images from "assets/images";
import { useAuth } from "utils/hooks";
import { Link } from "react-router-dom";
import Search from "./components/Search";
import { useState } from "react";
import Coins from "./components/Coins";
type Props = {};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .wrapper {
    height: var(--header-height);
    background-color: VAR(--white-color);
    .chat {
      margin-right: 10px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const Header = (props: Props) => {
  const isAuth = useAuth();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <StyledHeader>
      <div className="wrapper shadow-md flex justify-between">
        <div className="header-left flex ">
          <div className="logo h-full">
            <Link to="/">
              <img src={images.logo} alt="logo lati" className="h-full" />
            </Link>
          </div>
          <Navbar />
        </div>
        <div className="header-right flex items-center">
          {showSearchInput ? (
            <Search />
          ) : (
            <button onClick={() => setShowSearchInput(true)}>
              <img src={images.search} alt="search" className="w-6 h-6" />
            </button>
          )}

          <QRCode />
          {isAuth && <Coins />}
          {isAuth && <button className="chat">
            <Link to="/chat">
              <img src={images.chat} alt="chat" />
            </Link>
          </button>}
          {isAuth ? <User /> : <Button />}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
