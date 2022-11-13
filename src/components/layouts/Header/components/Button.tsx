import images from "assets/images";
import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


type Props = {};

const Wrapper = styled.div`
  .auth {
    background-image: rgb(226 232 240 / var(--tw-bg-opacity));
    transition: all 0.2s;

    &:hover {
      color: white;
      background-image: linear-gradient(0, #e29ec0, #bdace4);
    }
  }
`;

const StyledModal = styled.div`
  padding: 5px 20px;
  position: relative;
  z-index: 10000;

  .logo {
    height: 100px;
  }

  .close {
    color: #635d5d;
    font-size: 30px;
    transition: all 0.3s;
    position: absolute;
    top: 5px;
    right: 5px;

    &:hover {
      color: var(--primary-color);
      transform: scale(1.1);
    }
  }

  .form-header {
    display: flex;
    justify-content: space-around;
    height: 40px;

    button {
      font-size: 15px;
      font-weight: 600;
      padding: 5px;
      flex: 1;
      transition: all 0.4s;

      &:hover {
        color: var(--primary-color);
      }

      &:first-child {
        border-right: 1px solid #635d5d;
      }

      &.active {
        flex: 3;
        font-size: 20px;
        color: var(--primary-color);
      }
    }
  }

 
`


const Button = (props: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<"login" | "register">("login");

  //Change login/register form
  function setLoginForm(e: any) {
    e.preventDefault();
    setForm("login");
  }

  function setRegisterForm(e: any) {
    e.preventDefault();
    setForm("register");
  }

  //Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Wrapper>
      <button
        className={`auth flex items-center pl-4 mr-4 bg-slate-200 rounded`}
        onClick={openModal}
      >
        Login/Register
        <img src={images.avatar} alt="avatar" className="w-12 h-12" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        className = "animate__animated animate__rubberBand animate__fadeOut"
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
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
          },
        }}
      >
        <StyledModal>
          <img src={images.logo} alt="logo" className="logo" />
          <button className="close" onClick={closeModal}>
            <FaTimes />
          </button>
            <div className="form-header">
              <button
                onClick={setLoginForm}
                className={form === "login" ? "active" : ""}
              >
                Login
              </button>
              <button
                onClick={setRegisterForm}
                className={form === "register" ? "active" : ""}
              >
                Register
              </button>
            </div>
            {form === "login" ? <LoginForm/> : <RegisterForm/>}
        </StyledModal>
      </Modal>
    </Wrapper>
  );
};

export default Button;
