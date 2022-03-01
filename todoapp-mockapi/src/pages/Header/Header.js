import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/userSlice";
import _ from "lodash";
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding-right:0.8rem;
  &:hover {
    color:#ccc;
    }
  }
`;
const StyledHeader = styled(Box)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
`;

export default function Header() {
  // const userLoginBW = localStorage.getItem("userLogin");
  // const [userLogin, setUserLogin] = useState(JSON.parse(userLoginBW) ?? null);
  const { userLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.clear();
    // setUserLogin(null);
    dispatch(logOut());
  };
  const renderAuth = () => {
    return _.isEmpty(userLogin) ? (
      <>
        <Typography variant="h7">
          <StyledLink to="login">Sign In</StyledLink>
        </Typography>
        <Typography variant="h7">
          <StyledLink to="register">Sign Up</StyledLink>
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="h7">
          <StyledLink to="/" onClick={handleLogOut}>
            LOG OUT
          </StyledLink>
        </Typography>
      </>
    );
  };
  return (
    <StyledHeader sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="counter">Counter</StyledLink>
          </Typography>{" "}
          {renderAuth()}
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
}
