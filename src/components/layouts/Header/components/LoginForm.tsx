import StyledForm from "./StyledForm";

//Validate form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Redux
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { userLogin } from "redux/user/loginSlice";
import LoadingIcon from "components/Loading/LoadingIcon";
import { redirect, useNavigate } from "react-router-dom";
type Props = {};

type FormTypes = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

const LoginForm = (props: Props) => {
  const { login } = useAppSelector(state => state);
  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  function handleLogin(payload: FormTypes) {
    dispatch(userLogin(payload));
    navigate('/')
  }
  return (
    <StyledForm>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-login form-body">
          {errors.username && (
            <p className="error">{errors.username?.message}</p>
          )}
          {errors.password && (
            <p className="error">{errors.password?.message}</p>
          )}
          <div className="form-item">
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              id="login-username"
              placeholder="Enter username"
              {...register("username")}
            />
          </div>
          <div className="form-item">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              id="login-password"
            />
          </div>
          <div className="form-item">
            <button type="submit" className="btn-submit">
              Login
            </button>
            {login.loading && <LoadingIcon />}
          </div>
        </div>
      </form>
    </StyledForm>
  );
};

export default LoginForm;
