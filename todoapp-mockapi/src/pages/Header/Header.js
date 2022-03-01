import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
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
          </Typography>
          <Typography variant="h7">
            <StyledLink to="login">Login</StyledLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
}
