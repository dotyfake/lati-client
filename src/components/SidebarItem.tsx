import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameType } from 'utils/interfaces';

type Props = {
  listGame : GameType
};
const Wrapper = styled.div`

.item{
    transition: all 0.4s;
    &:hover{
        background-color: #f4f4f4;
    }

    &:hover .name{
        color: black;
        transform: translateX(4px);
    }

    &:hover img{
        transform: scale(1.1)
    }
}

.name{
    font-size: 15px;
    font-weight: 600;
    color:  rgb(100 100 100);
}
`;
const SidebarItem = (props: Props) => {
  return (
    <Wrapper>
      <a href = {`/skill/${props.listGame.slug}`}>
        <div className="item flex pl-4 py-3">
          <div className="logo">
            <img
              src= {props.listGame.pcImageUrl}
              alt=""
              className="w-8 rounded-md"
            />
          </div>
          <div className="name ml-2 items-center flex">
            <span>{props.listGame.name}</span>
          </div>
        </div>
      </a>
    </Wrapper>
  );
};

export default SidebarItem;
