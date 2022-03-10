import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import { fetchListUser, fetchSignUpUser } from "../../features/auth/userSlice";
import "./Register.css";
import { handleToast } from "../ToastNotification/toast";
import ToastComponent from "../ToastNotification";
const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required!"),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required("Password is required!"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]{9,12}$/, "Phone is not in correct format"),
  })
  .required();

export default function Register() {
  const { error, arrUser } = useSelector((state) => state.user);
  const [values, setValues] = useState({
    password: "",
    email: "",
    phone: "",
    showPassword: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    dispatch(fetchListUser());
    console.log("Hello");
  }, []);
  const onSubmit = (data) => {
    const userSignUp = _.find(arrUser, { email: data.email });
    console.log(data.email);
    console.log(arrUser);
    if (userSignUp) {
      return handleToast("error", "Email already exists");
    } else {
      dispatch(fetchSignUpUser({ ...data, phone: +data.phone }));
      setTimeout(() => {
        if (!error) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return handleToast("success", "Sign Up Successfully");
        } else {
          return handleToast("error", "Sign Up Failed");
        }
      }, 1500);
    }
  };
  const SpanStyled = styled.span`
    color: red;
    font-size: 0.8em;
  `;
  const FormStyled = styled(Box)`
    text-align: center;
  `;
  return (
    <>
      <ToastComponent />
      <Container component="main" className="register-container" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", mt: 3 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <FormStyled
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              {...register("email")}
            />
            <SpanStyled>{errors.email?.message}</SpanStyled>
            <div className="position-relative">
              <TextField
                id="password"
                required
                name="password"
                {...register("password")}
                label="Password"
                type={values.showPassword ? "text" : "password"}
                fullWidth
              />{" "}
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="position-absolute"
                style={{ right: 0, top: "5px" }}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            <SpanStyled>{errors.password?.message}</SpanStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              {...register("phone")}
              label="Phone"
              type="text"
              id="phone"
            />
            <SpanStyled>{errors.phone?.message}</SpanStyled>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link to="/login" className="text-danger mt-3">
              Go back
            </Link>
          </FormStyled>
        </Box>
      </Container>
    </>
  );
}
