import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import axiosPublic from "utils/axiosPublic";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { setUserInfo } from "redux/user/loginSlice";

//components
import Uploading from "components/Loading/Uploading";

//icons
import { FaUpload } from "react-icons/fa";

const Wrapper = styled.div`
  padding: 14px;

  .avatar {
    position: relative;
    border-radius: 16px;
    overflow: hidden;

    &:hover label {
      background-color: rgba(255, 255, 255, 0.4);
    }

    label {
      align-items: flex-end;
      justify-content: center;
      position: absolute;
      color: var(--white-color);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      cursor: pointer;

      span {
        display: inline-flex;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 2px 8px;
        border-radius: 4px;
        margin-bottom: 20px;
        svg {
          margin-right: 5px;
          color: var(--white-color);
        }
      }
    }

    input {
      display: none;
    }
  }
`;

type Props = {};

const UploadAvatar = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [valueFileInput, setValueFileInput] = useState("");
  const [uploading, setUploading] = useState<boolean>(false);

  //Handle
  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    setUploading(true);
    setValueFileInput(event.target.value);

    //convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  //upload image with axios
  const uploadImage = async (
    base64EncodedImage: string | ArrayBuffer | null
  ) => {
    try {
      if (login.userInfo) {
        const res = await axiosPublic({
          method: "put",
          url: "/account/uploadAvatar",
          headers: {
            Authorization: `Bearer ${login.userInfo.accessToken}`,
          },
          data: {
            avatar: base64EncodedImage,
          },
        });
        if (res.data) {
          setUploading(false);
          toast.success(`Change avatar successfully!`);
        }
        dispatch(setUserInfo({ ...login.userInfo, avatar: res.data.avatar }));
      }
    } catch (error) {
      toast.error(`Change avatar fail, Please try again`);
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <div
        className="avatar"
        style={{
          background: `url(${login.userInfo?.avatar}) center / cover no-repeat`,
          paddingTop: "100%",
        }}
      >
        <label htmlFor="upload-avatar">
          <span>
            <FaUpload />
            Change Avatar
          </span>
        </label>
        <input
          type="file"
          name="avatar"
          id="upload-avatar"
          max-size="2000"
          defaultValue={valueFileInput}
          onChange={handleFileInputChange}
        />
      </div>
      {uploading && <Uploading />}
    </Wrapper>
  );
};

export default UploadAvatar;
