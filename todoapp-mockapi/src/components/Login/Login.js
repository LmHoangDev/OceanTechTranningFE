import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { fetchListUser, signIn } from "../../features/auth/userSlice";
import ToastComponent from "../ToastNotification";
import { handleToast } from "../ToastNotification/toast";
export default function Login() {
  const { arrUser, error, userLogin } = useSelector((state) => state.user);
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const FormStyled = styled(Box)`
    width: 100%;
  `;
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
        navigate("/counter");
      }, 2500);
      localStorage.setItem("userLogin", JSON.stringify(userLoginForm.id));
      dispatch(signIn(userLoginForm));
      return handleToast("success", "Login Successfully!");
    } else {
      return handleToast("error", "Login Failed!");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minWidth: "300px" }}>
      <CssBaseline />
      <ToastComponent />
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
          Sign in
        </Typography>
        <FormStyled
          component="form"
          onSubmit={handleSubmit}
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
            onChange={handleChange}
            value={values.email}
            type="email"
            autoFocus
          />
          <div className="position-relative">
            <TextField
              id="password"
              required
              label="Password"
              type={values.showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={values.password}
              fullWidth
              autoFocus
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container className="text-center">
            <Grid item xs>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </FormStyled>
      </Box>
    </Container>
  );
}
