import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import axiosPublic from "utils/axiosPublic";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { setUserInfo } from "redux/user/loginSlice";
import { LoadingIcon } from "components/index";
import { toast } from "react-toastify";
import { useViewport } from "utils/hooks";
type Props = {};

type StyledType = {
  isMobile?: boolean
};

const Wrapper = styled.div<StyledType>`
  h2 {
    font-size: 1.4rem;
    margin-left: 20px;
  }
  .photos {
    padding: 0 10px;

    input {
      visibility: hidden;
    }

    label {
      svg {
        color: #e4e0e0;
        font-size: 1.6rem;
      }

      &:hover .photo {
        background-color: #f5f5f5;
      }
    }
    .photo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f8f8f8;
      border-radius: 14px;
      height: ${props => props.isMobile ? '150px' : '210px' };
      cursor: pointer;
      overflow: hidden;
      margin-top: 12px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      &:hover {
        filter: brightness(0.9);
      }

      .delete {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        width: 30px;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.4);
        svg {
          color: var(--white-color);
        }

        &:hover svg {
          color: var(--primary-color);
        }
      }

      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
    }
  }
`;

const Photos = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [valueFileInput, setValueFileInput] = useState("");
  const [uploading, setUploading] = useState<boolean>(false);

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 765;


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


  const uploadImage = async (
    base64EncodedImage: string | ArrayBuffer | null
  ) => {
    try {
      if (login.userInfo) {
        const res = await axiosPublic({
          method: "post",
          url: "/account/uploadPhoto",
          headers: {
            Authorization: `Bearer ${login.userInfo.accessToken}`,
          },
          data: {
            photo: base64EncodedImage,
          },
        });
        if (res.data) {
          setUploading(false);
          toast.success(`Add photo successfully!`);
        }

        dispatch(setUserInfo({ ...login.userInfo, photos: res.data.photos }));
      }
    } catch (error) {
      toast.error(`Add photo fail, Please try again!`);
      console.log(error);
    }
  };

  const deletePhoto = async (photo: any) => {
    try {
      if (login.userInfo) {
        const res = await axiosPublic({
          method: "delete",
          url: "/account/deletePhoto",
          headers: {
            Authorization: `Bearer ${login.userInfo.accessToken}`,
          },
          data: {
            photoId: photo._id,
            cloudinary_id: photo.cloudinary_id,
          },
        });
        if (res.data) {
          toast.success(`Photo Deleted!`);
        }

        dispatch(setUserInfo({ ...login.userInfo, photos: res.data.photos }));
      }
    } catch (error) {
      toast.error(`Delete photo fail, Please try again!`);
      console.log(error);
    }
  };
  return (
    <Wrapper isMobile = {isMobile}>
      <h2>Photos</h2>
      <div className="photos">
        <div className="row sm-gutter">
          {login.userInfo?.photos.map((photo, index) => (
            <div className=" col l-6 c-6" key={index}>
              <div
                className="photo"
                style={{
                  background: `url(${photo.photoUrl}) center / cover no-repeat`,
                }}
              >
                <button className="delete" onClick={() => deletePhoto(photo)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
          <label className=" col l-6 c-6" htmlFor="input-photo">
            <div className="photo">
              {uploading ? <LoadingIcon /> : <FaPlus />}
            </div>
          </label>
          <input
            type="file"
            name="input-photo"
            id="input-photo"
            max-size="2000"
            defaultValue={valueFileInput}
            onChange={handleFileInputChange}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Photos;
