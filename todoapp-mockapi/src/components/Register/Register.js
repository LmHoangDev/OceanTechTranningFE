import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchListUser, fetchSignUpUser } from "../../features/auth/userSlice";
import { set } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [values, setValues] = useState({
    password: "",
    email: "",
    phone: "",
    showPassword: false,
  });
  const { error, arrUser } = useSelector((state) => state.user);
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
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //     phone: data.get("phone"),
  //   });
  // };
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
      return toast.error("Email already exists", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(fetchSignUpUser({ ...data, phone: +data.phone }));
      setTimeout(() => {
        if (!error) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return toast.success("Sign Up Successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          return toast.error("Sign Up Failed", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            autoComplete="email"
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
              autoComplete="current-password"
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
            autoComplete="current-password"
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
        </FormStyled>
      </Box>
    </Container>
  );
}
