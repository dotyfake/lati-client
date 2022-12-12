import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HeadlessTippy from "@tippyjs/react/headless";

import { FaRegTimesCircle, FaSearch } from "react-icons/fa";
import { useDebounce } from "utils/hooks";
import axiosPublic from "../../../../utils/axiosPublic";
import LoadingIcon from "components/Loading/LoadingIcon";
import { Link } from "react-router-dom";

type Props = {
  type?: "chat" | "default";
};

type UserType = {
  username: string;
  displayName: string;
  bio: string;
  avatar: any;
  _id: string;
};

const Search = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [hasResultBox, setHasResultBox] = useState(true);
  const [searchResult, setSearchResult] = useState<UserType[]>([]);
  const inputRef = useRef<HTMLInputElement>();
  const debouncedValue = useDebounce<string>(searchValue, 700);

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
    setHasResultBox(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      if (searchValue.length > 1) {
        const res = await axiosPublic.get(`/search?payload=${searchValue}`);
        setSearchResult(res.data);
      }
    };
    getUsers();
  }, [debouncedValue]);

  useEffect(() => {
    if (searchValue.length > 1) {
      setHasResultBox(true);
    }
  }, [searchValue]);

  return (
    <Wrapper>
      <HeadlessTippy
        visible={hasResultBox}
        onClickOutside={() => setHasResultBox(false)}
        interactive={true}
        placement={'bottom'}
        render={(attrs) => (
          <div className="result-box shadow-lg">
            {searchResult ? (
              searchResult.map((user) => (
                <Link
                  key={user._id}
                  to={
                    props.type === "chat"
                      ? `/chat/${user._id}`
                      : `/user/${user._id}`
                  }
                  onClick={() => setHasResultBox(false)}
                >
                  <div className="user">
                    <div className="avatar">
                      <img src={user.avatar.avatarUrl} alt="" />
                    </div>
                    <div className="info">
                      <div className="name">
                        {user.displayName}
                        <span className="id">ID: {user.username}</span>
                      </div>
                      <p className="bio">{user.bio}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <LoadingIcon />
            )}
          </div>
        )}
      >
        <div className="search">
          <FaSearch />
          <input
            type="text"
            placeholder="Enter nickname or ID"
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={searchValue}
            onChange={changeSearchValue}
          />
          {searchValue.length > 0 && (
            <button className="clear" onClick={clearSearchValue}>
              <FaRegTimesCircle />
            </button>
          )}
        </div>
      </HeadlessTippy>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height: 32px;
    border-radius: 16px;
    border: solid 1px #d6d6d6;
    overflow: hidden;
    input {
      flex: 1;
      outline: none;
      ::-webkit-input-placeholder {
        color: #d6d6d6;
        font-size: 14px;
      }
    }
    svg {
      margin: 0 10px;
      color: #d6d6d6;
    }

    .clear {
      cursor: pointer;

      &:hover svg {
        color: var(--primary-color);
      }
    }

    &:focus-within {
      border: solid 1px var(--primary-color);
    }
  }

  .result-box {
    width: 300px;
    border-radius: 4px;
    max-height: 320px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 2000;

    .user {
      display: flex;
      align-items: center;
      overflow: hidden;
      transition: all 0.4s;
      padding: 8px;
      background-color: var(--white-color);

      .avatar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .info {
        margin-left: 8px;
        flex: 1;

        .name {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;

          span {
            color: #8a8c99;
          }
        }

        .bio {
          font-size: 12px;
          font-weight: 500;
          color: #8a8c99;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
        }
      }
      &:hover {
        background-color: #f9f9f9;
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #8b5cf6;
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #7c4bf0;
    }
  }
`;

export default Search;
