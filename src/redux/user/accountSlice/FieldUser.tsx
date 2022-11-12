import images from "assets/images";
import React, { memo } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "./accountSlice";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { setUserInfo } from "redux/user/loginSlice";
import { UserInfo } from "redux/user/loginSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type Props = {
  title: string;
  value?: string | number;
  name: string;
};

type ErrorDataType = {
success: boolean;
message: string
}


const Wrapper = styled.div`
  margin-bottom: 20px;

  .content {
    display: flex;
    padding-left: 10px;

    p {
      margin-right: 5px;
    }
  }

  h2 {
    margin: 8px 0;
    font-size: 18px;
    font-weight: 500;
    display: flex;
  }

  img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }

  .wrapper-control {
    input,textarea {
      border: #999 1px solid;
      padding: 5px;
      width: 80vw;
      max-width: 400px;
      border-radius: 8px;

      &:focus {
        outline: 1px solid var(--primary-color);
      }
    }

    .button {
      display: flex;
      justify-content: center;
      margin: 14px;
      button {
        border-radius: 16px;
        color: #999;
        width: 80px;

        &.primary {
          color: var(--white-color);
          background-color: var(--primary-color);
        }
      }
    }
  }
`;

const FieldUser = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [updateUser, {isLoading, isError, error}] = useUpdateUserMutation();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.value);

  const handleUpdateUser = () => {
    try {
      updateUser({
        name: props.name,
        value: inputValue,
        accessToken: login.userInfo?.accessToken,
      });
    } catch (error) {
      toast.error("Fail to change, please try again!");
    }
  };

  function isFetchBaseQueryError(
    error: unknown
  ): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
  }

  useEffect(() => {
    if (!isLoading) {
      const userInfo = {
        ...login.userInfo,
        [props.name]: inputValue,
      } as UserInfo;

      if(!isError){
        dispatch(setUserInfo(userInfo));
        setEditing(false);
      }
    }
  }, [isLoading]);

  useEffect(() => { 
    if (isFetchBaseQueryError(error)) {
    const errorData = error.data as ErrorDataType
    toast.error(`${errorData.message}`)
}
   
  }, [error]);



  return (
    <Wrapper>
      <h2>
        {props.title}
        {!editing && props.name !== "gender" && (
          <button>
            <img
              src={images.edit}
              alt="edit"
              onClick={() => setEditing(true)}
            />
          </button>
        )}
      </h2>
      <div className="content">
        {editing ? (
          <div className="wrapper-control">
            {props.name !== "bio" ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value);
                }}
              />
            ) : (
              <textarea
                cols={50}
                rows={4}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
              ></textarea>
            )}
            <div className="button">
              <button onClick={() => setEditing(false)}>Cancel</button>
              <button className="primary" onClick={handleUpdateUser}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <p>{props.value}</p>
        )}
      </div>
    </Wrapper>
  );
};

export default memo(FieldUser);
