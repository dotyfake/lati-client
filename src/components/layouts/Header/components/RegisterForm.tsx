import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StyledForm from "./StyledForm";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { userRegister } from "redux/user/registerSlice";
import images from "assets/images";
import { useState } from "react";

type Props = {};

type FormTypes = {
  username: string;
  displayName: string;
  password: string;
  gender: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please enter your username.")
    .min(6, "Username must be minimum of 6 characters")
    .max(32, "Username must be maximum of 32 characters"),
  displayName: yup
    .string()
    .required("Please enter your display name.")
    .min(4, "Display name must be minimum of 4 characters")
    .max(32, "Display name must be maximum of 32 characters"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be minimum of 6 characters")
    .max(32, "Password must be maximum of 32 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
});

const RegisterForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<FormTypes>({
    username: "",
    displayName: "",
    password: "",
    gender: "",
    confirmPassword: "",
  });

  // useForm setup react hook form & yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  function handleRegister() {
    const newPayload = {
      username: formState.username,
      password: formState.password,
      gender: formState.gender,
      displayName: formState.displayName,
    };

    dispatch(userRegister(newPayload));
  }
  return (
    <StyledForm>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="form-register form-body">
          {errors.username && (
            <p className="error">{errors.username?.message}</p>
          )}
          {errors.displayName && (
            <p className="error">{errors.displayName?.message}</p>
          )}
          {errors.password && (
            <p className="error">{errors.password?.message}</p>
          )}
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword?.message}</p>
          )}
          <div className="form-item">
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...register("username")}
              id="login-username"
              value={formState.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <label htmlFor="login-displayName">Nickname</label>
            <input
              type="text"
              placeholder="Enter display name"
              {...register("displayName")}
              id="login-displayName"
              value={formState.displayName}
              onChange={(e) =>
                setFormState({ ...formState, displayName: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <div className="wrapper">
              <label htmlFor="male">
                <img src={images.lgBoy} alt="male" />
                Male
              </label>
              <input
                className="radio-gender"
                type="radio"
                name="gender"
                id="male"
                value="Male"
                defaultChecked
                onChange={(e) =>
                  setFormState({ ...formState, gender: e.target.value })
                }
              />
              <label htmlFor="female">
                <img src={images.lgGirl} alt="male" />
                Female
              </label>
              <input
                className="radio-gender"
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={(e) =>
                  setFormState({ ...formState, gender: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              id="login-password"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <label htmlFor="login-confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              id="login-confirmPassword"
              value={formState.confirmPassword}
              onChange={(e) =>
                setFormState({ ...formState, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <button type="submit" className="btn-submit">
              Register
            </button>
          </div>
        </div>
      </form>
    </StyledForm>
  );
};

export default RegisterForm;
