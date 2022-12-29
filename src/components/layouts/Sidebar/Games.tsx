import styled from "styled-components";
import { SidebarItem } from "components";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { getListGame } from "redux/games/listGameSlice";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type Props = {};

const Wrapper = styled.div`
  background-color: #fff;
  width: var(--sidebar-w);

  .skeleton-sidebar {
    & > div {
      margin: 10px;
      margin-right: 30px;
    }
  }
`;

const Games = (props: Props) => {
  const { listGame } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(getListGame());
  }, []);
  return (
    <Wrapper>
      <h3 className="py-8 pl-4 text-md font-semibold ">All Services</h3>
      {listGame.loading ? (
        <div className="skeleton-sidebar">
          {Array(12)
            .fill(0)
            .map(() => (
              <div>
                <Skeleton height={44} />
              </div>
            ))}
        </div>
      ) : (
        listGame.listGame && listGame.listGame.map((item, index) => (
          <SidebarItem key={index} listGame={item} />
        ))
      )}
    </Wrapper>
  );
};

export default Games;
