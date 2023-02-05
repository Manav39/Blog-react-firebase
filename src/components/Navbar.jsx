import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useFirebase } from "../context/Firebase";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import avatar from "../assets/avatar.jpg";
//src={firebase.user.photoURL === null ? firebase.user.photoURL : avatar}
function Navbar() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BlogBux
          </Typography>
          <div style={{ marginLeft: "20px", display: "flex" }}>
            <ul
              style={{
                display: "flex",
                listStyleType: "none",
                gap: "2rem",
                fontSize: "20px",
              }}
            >
              <Link
                to="/explore"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>Explore</li>
              </Link>
              {firebase.isLoggedIn && (
                <>
                  <Link
                    to="/createblog"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <li>Create blog</li>
                  </Link>
                  <Link
                    to="/yourblogs"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <li>Your Blogs</li>
                  </Link>
                </>
              )}
            </ul>

            {!firebase.isLoggedIn ? (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p
                  style={{ right: "0", fontSize: "20px", marginLeft: "700px" }}
                >
                  Login
                </p>
              </Link>
            ) : (
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      right: "0",
                      fontSize: "20px",
                      marginLeft: "450px",
                      display: "flex",
                    }}
                  >
                    {firebase.user?.displayName
                      ? firebase.user.displayName
                      : firebase.user.email}{" "}
                    &nbsp;
                  </p>

                  <Avatar
                    alt="User"
                    src={
                      firebase.user.photoURL === null
                        ? avatar
                        : firebase.user.photoURL
                    }
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
