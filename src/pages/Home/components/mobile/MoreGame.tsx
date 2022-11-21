import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";


type Props = {
    setShowMoreGames: React.Dispatch<React.SetStateAction<boolean>>;
};

const MoreGame = (props: Props) => {
    const {listGame} = useAppSelector(state=> state)
  return (
    <Wrapper initial={{ opacity: 0, scale: 0, transformOrigin: '90% 0%' }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0, transformOrigin: '90% 0%' }}
    >
      <div className="header">
        All Services
        <button onClick={()=> props.setShowMoreGames(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="body wide">
      <div className="row">
              {listGame.listGame.map((game, i) => (
                <div className="game col c-3" key={i}>
                  <Link to={`skill/${game.slug}`}>
                    <div className="image">
                      <img src={game.mainIconUrl} alt="" />
                    </div>
                    <p>{game.name}</p>
                  </Link>
                </div>
              ))}
            </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  z-index: 2001;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 16px;
    font-size: 18px;
    font-weight: 600;
box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

    button {
      svg {
        color: #706b6b;
        font-size: 22px;
      }
    }
  }

  .game {
    margin-top: 5px;
    padding: 10px 5px;
    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }

    p {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 11px;
      font-weight: 600;
      color: #333;
    }
  }
`;

export default MoreGame;
