import images from "assets/images";
import { BsTrash, BsSave } from "react-icons/bs";
import styled from "styled-components";
import { SkillType } from "utils/interfaces";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteSkillMutation, useEditSkillMutation } from "../skillsSlice";
import { setUserInfo, UserInfo } from 'redux/user/loginSlice';
import { useAppDispatch,useAppSelector } from 'app/hooks';

type Props = {
  skill: SkillType;
};

type EditSkillType = {
  intro: string;
  price: number;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 3px solid #f1f1f1;
  border-radius: 8px;

  &:focus-within {
    border: 3px solid var(--success-color);
  }

  .content {
    font-size: 18px;

    span {
      font-weight: 600;
      color: var(--primary-color);
      margin-right: 5px;
    }

    input,
    textarea {
      border: 1px solid #999;
      border-radius: 8px;
      padding-left: 10px;

      &:focus {
        outline: 1px solid var(--primary-color);
      }
    }

    input {
      width: 100px;
    }
    .content-top {
      display: flex;
      .content-item {
        display: flex;
        align-items: center;

        img {
          width: 40px;
          margin-right: 5px;
        }
      }
      .price {
        img {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      }
      .name {
        margin-right: 10px;
        font-size: 20px;
      }
    }

    .content-bottom {
      .intro {
        display: flex;
        textarea {
          width: 100%;
        }
      }
    }
  }

  .controls {
    width: 60px;
    img {
      width: 26px;
    }

    .edit {
      &:hover {
        filter: hue-rotate(195deg);
      }
    }

    .delete {
      svg {
        color: var(--primary-color);
        font-size: 26px;
      }
      &:hover svg {
        color: var(--red-color);
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    .save-skill {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--success-color);
      color: var(--white-color);
      padding: 10px;
      border-radius: 15px;
      height: 30px;
      svg {
        margin-right: 5px;
      }
    }
    .cancel{
        display: flex;
        color: #999;
        margin-right: 20px;
    }
  }
`;

const AccountSkill = (props: Props) => {
const {login} = useAppSelector(state => state)
  const [swapControls, setSwapControls] = useState(true);
  const [editState, setEditState] = useState<EditSkillType>({
    intro: props.skill.intro,
    price: props.skill.price,
  });
  const dispatch = useAppDispatch()
  const [editSkill, {isSuccess : editSkillSuccess, data: editSkillData}] = useEditSkillMutation();

  const [deleteSkill, {isSuccess : deleteSkillSuccess, data: deleteSkillData}] = useDeleteSkillMutation();


  const handleEditSkill = () => {
    if(editState.price > 0 && editState.intro.length > 0){
        const skillDetail = {
            ...props.skill, ...editState
        }
        const payload = {
            accessToken: login.userInfo?.accessToken,
            skillDetail
        }
        
        editSkill(payload)
        setSwapControls(true);
    } else{
        toast.error("Missing price or intro of skill.")
    };
  };

  const handleDeleteSkill = () => {
    const payload = {
        accessToken: login.userInfo?.accessToken,
        slug: props.skill.slug
    }
    
    deleteSkill(payload)
  }

  useEffect(() => {
    if (editSkillSuccess) {
      dispatch(setUserInfo({...login.userInfo, skills: editSkillData.skills} as UserInfo))
    }
  }, [editSkillSuccess, editSkillData]);

  useEffect(() => {
    if (deleteSkillSuccess) {
      dispatch(setUserInfo({...login.userInfo, skills: deleteSkillData.skills} as UserInfo))
    }
  }, [deleteSkillData, deleteSkillSuccess]);

  return (
    <Wrapper>
      <div className="content">
        <div className="content-top">
          <div className="content-item name">
            <img src={props.skill.iconUrl} alt="icon" />
            {props.skill.name}
          </div>
          <div className="content-item price">
            <span>Price:</span>
            {swapControls ? (
              props.skill.price
            ) : (
              <input
                type="number"
                value={editState.price}
                autoFocus
                onChange={(e) => {
                  setEditState({ ...editState, price: +e.target.value });
                }}
              />
            )}
            <img src={images.coin} alt="" />
          </div>
        </div>
        <div className="content-bottom">
          <div className="intro">
            <span>Intro:</span>
            {swapControls ? (
              props.skill.intro
            ) : (
              <textarea
                cols={30}
                rows={2}
                value={editState.intro}
                onChange={(e) =>
                  setEditState({ ...editState, intro: e.target.value })
                }
              ></textarea>
            )}
          </div>
        </div>
      </div>
      {swapControls ? (
        <div className="controls">
          <Tippy content="Edit">
            <button className="edit" onClick={()=>  setSwapControls(false)}>
              <img src={images.edit} alt="" />
            </button>
          </Tippy>
          <Tippy content="Delete">
            <button className="delete" onClick={handleDeleteSkill}>
              <BsTrash />
            </button>
          </Tippy>
        </div>
      ) : (
        <div className="buttons">
          <button className="cancel" onClick ={()=> {
            setSwapControls(true)
          }}>
            Cancel
          </button>
          <button className="save-skill" onClick={handleEditSkill}>
            <BsSave />
            Save
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default AccountSkill;
