import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../../features/auth/userSlice";

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
  const { userLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logOut());
  };
  const renderAuth = () => {
    return _.isEmpty(userLogin) ? (
      <>
        <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
        <Typography variant="h7">
          <StyledLink to="login">Sign In</StyledLink>
        </Typography>
        <Typography variant="h7">
          <StyledLink to="register">Sign Up</StyledLink>
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="h7" component="div">
          <StyledLink to="counter">Counter</StyledLink>
        </Typography>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="task">Task Management</StyledLink>
        </Typography>
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
            onClick={() => {
              navigate("/task");
            }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>

          {renderAuth()}
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
}
