import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";

export const Header = () => {
  const dispath = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    dispath(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            LOVCHIKOV BLOG
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Avatar
                  sx={{ marginLeft: "20px" }}
                  alt={user.fullName}
                  src={user.avatarUrl}
                />
                <Button onClick={onClickLogout} color="error">
                  <LogoutIcon />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">
                    <LoginIcon />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
