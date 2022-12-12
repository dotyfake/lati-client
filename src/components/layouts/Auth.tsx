import images from 'assets/images'
import React, { useState } from 'react'
import { StyledModal } from './Header/components/Button'
import LoginForm from './Header/components/LoginForm'
import RegisterForm from './Header/components/RegisterForm'

type Props = {
    children?: React.ReactNode
}

const Auth = (props: Props) => {
    const [form, setForm] = useState<"login" | "register">("login");
  
    function setLoginForm(e: any) {
        e.preventDefault();
        setForm("login");
      }
    
      function setRegisterForm(e: any) {
        e.preventDefault();
        setForm("register");
      }
  return (
    <div style={{marginTop: '100px'}}>
        <StyledModal>
            <img src={images.logo} alt="logo" className="logo" />
            {/* <button className="close" onClick={closeModal}>
              <FaTimes />
            </button> */}
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
    </div>
  )
}

export default Auth