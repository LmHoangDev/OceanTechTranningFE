import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { fetchListUser, signIn } from "../../features/auth/userSlice";
import ToastComponent from "../ToastNotification";
import { handleToast } from "../ToastNotification/toast";
import "./Login.css";

export default function Login() {
  const { arrUser, error, userLogin } = useSelector((state) => state.user);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListUser());
  }, []);
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const userLoginForm = _.find(arrUser, {
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log(userLoginForm);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (userLoginForm) {
      setTimeout(() => {
        navigate("/");
      }, 2500);
      localStorage.setItem("userLogin", JSON.stringify(userLoginForm.id));
      dispatch(signIn(userLoginForm));
      return handleToast("success", "Login Successfully!");
    } else {
      return handleToast("error", "Login Failed!");
    }
  };

  return (
    <>
      <ToastComponent />
      <div className="login-container">
        <div>
          <img
            src="https://preview.colorlib.com/theme/bootstrap/login-form-19/images/xbg.jpg.pagespeed.ic.3DwAHJh7F3.webp"
            alt="..."
            className="img-login"
          />
        </div>
        <h1 className="text-light display-6 mb-0">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              placeholder="Enter email..."
              name="email"
              onChange={handleChange}
              value={values.email}
              className="input-login"
            />
          </div>

          <div className="position-relative">
            <input
              id="password"
              label="Password"
              placeholder="Enter password..."
              type={values.showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={values.password}
              className="input-login"
            />
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className="position-absolute"
              style={{ right: 0, top: "15px" }}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <button
            type="submit"
            className="d-block bg-danger text-light btn-signIn text-uppercase"
          >
            Sign In
          </button>
          <div className="text-center">
            <Link to="/register" className="d-block text-light py-3">
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
