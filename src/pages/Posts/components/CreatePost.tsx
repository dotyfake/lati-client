import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import {
  FaRegEdit,
  FaPhotoVideo,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";

//redux
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useCreatePostMutation } from "redux/posts/postSlice";
import { setUserInfo } from 'redux/user/loginSlice';

//tippyjs
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Uploading from "components/Loading/Uploading";
import { useAuth } from "utils/hooks";

import { PostType } from 'utils/interfaces';

type Props = {
  newPost: React.Dispatch<React.SetStateAction<PostType | undefined>>
};

const CreatePost = (props: Props) => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch()
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [contentPost, setContentPost] = useState("");
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

    const isAuth = useAuth()

  const [createPost, { data, isLoading }] = useCreatePostMutation();

  function closeModal() {
    setShowCreatePostModal(false);
  }

  const handleChangeFilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
    }
  };

  const handleCreatePost = () => {
    if (previewPhoto || contentPost) {
      createPost({
        accessToken: login.userInfo?.accessToken,
        photo: previewPhoto,
        content: contentPost,
      });
    }
  };
  
  useEffect(() => {
    if (login.userInfo && data){
      const currentPosts = [...login.userInfo?.posts, data.post as PostType];
      dispatch(setUserInfo({...login.userInfo, posts: currentPosts}))
      props.newPost(data.post)
    }
    setShowCreatePostModal(false);
    setPreviewPhoto("");
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [data]);

  return (
    <Wrapper>
      {isAuth && <button
        className="btn-create-post"
        onClick={() => setShowCreatePostModal(true)}
      >
        <FaRegEdit /> Create Post
      </button>}
      <Modal
        isOpen={showCreatePostModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
          overlay: {
            background: "rgba(0,0,0,0.1)",
            zIndex: 1000,
          },
        }}
      >
        <ModalStyled>
          <div className="create-post">
            <div className="header">
              <h2>Create post</h2>
              <Link to={`/user/${login.userInfo?.id}`}>
                <div className="info">
                  <img className="avatar" src={login.userInfo?.avatar} alt="" />
                  <div className="name">{login.userInfo?.displayName}</div>
                </div>
              </Link>
            </div>
            <div className="body">
              <textarea
                cols={4}
                rows={2}
                placeholder={`What's on your mind, ${login.userInfo?.displayName}?`}
                onChange={(e) => setContentPost(e.target.value)}
              ></textarea>
              {!previewPhoto ? (
                <label className="add-photo" htmlFor="post-photo">
                  <FaPhotoVideo />
                </label>
              ) : (
                <div className="preview-photo">
                  <Tippy content="Remove">
                    <button
                      className="remove"
                      onClick={() => setPreviewPhoto("")}
                    >
                      <FaTimes />
                    </button>
                  </Tippy>
                  <img className="" src={previewPhoto} alt="previewPhoto" />
                </div>
              )}
              <input
                type="file"
                id="post-photo"
                style={{ display: "none" }}
                onChange={handleChangeFilePhoto}
              />
              {isLoading ? (
                <Uploading />
              ) : (
                <button className="btn-post" onClick={handleCreatePost}>
                  Post
                </button>
              )}
            </div>
          </div>
        </ModalStyled>
      </Modal>
    </Wrapper>
  );
};

const ModalStyled = styled.div`
  .create-post {
    width: 90vw;
    max-width: 560px;

    .header {
      display: flex;
      justify-content: space-between;
      h2 {
        font-weight: 600;
        font-size: 20px;
        color: #444;
      }

      .info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 5px;
        }
        .name {
          font-weight: 500;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
        }
      }
    }

    .body {
      margin-top: 10px;
      textarea {
        border: #999 1px solid;
        padding: 5px;
        width: 100%;
        border-radius: 8px;
        &:focus {
          outline: 1px solid var(--primary-color);
        }
      }

      .preview-photo {
        margin-bottom: 10px;
        position: relative;

        img{
            width: 100%;
            height: 460px;
            object-position: center;
            object-fit: cover;
        }

        .remove {
          position: absolute;
          display: none;
          top: 10px;
          right: 10px;
          color: var(--white-color);
          font-size: 30px;

          &:hover {
            color: var(--primary-color);
          }
        }

        &:hover {
          .remove {
            display: block;
            filter: brightness(2);
          }
        }
      }

      .add-photo {
        display: block;
        cursor: pointer;
        margin: 0 5px 10px 10px;
        svg {
          font-size: 24px;
          color: #444;
        }
      }
      .btn-post {
        width: 100%;
        background-color: var(--primary-color);
        color: var(--white-color);
        font-size: 20px;
        border-radius: 20px;
      }
    }
  }
`;

const Wrapper = styled.div`
  .btn-create-post {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    width: 170px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    color: var(--white-color);
    padding: 5px 12px;
    border-radius: 20px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;

    svg {
      margin-right: 4px;
      font-size: 24px;
      color: var(--white-color);
    }

    &:hover {
      font-weight: 600;
    }
  }
`;

export default CreatePost;
