import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import { SideBlock } from "./SideBlock";
import { calculateTimePassed } from "../functions/calculateTimePassed";
import axios from "../axios";
import { Index } from "./AddComment";

export const CommentsBlock = ({ items, isLoading = true, refreshPage }) => {
  const user = useSelector((state) => state.auth.data);

  const handleDelete = async (date) => {
    try {
      if (window.confirm("Вы действительно хотите удалить комментарий?")) {
        await axios.patch(`/posts/64e1bea2809a8b6fce292960/${date}`);
        refreshPage();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <ListItemText
                    primary={`${obj.user.fullName} | ${calculateTimePassed(
                      obj.date
                    )} назад`}
                    secondary={obj.text}
                  />
                  {obj.user.fullName === user?.fullName && (
                    <Button onClick={() => handleDelete(obj.date)}>
                      <DeleteIcon style={{ color: "red" }} />
                    </Button>
                  )}
                </>
              )}
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
      {user ? (
        <Index refreshPage={refreshPage} />
      ) : (
        <Typography sx={{ padding: "15px" }} color="textSecondary">
          Только зарегистрированные пользователи могут оставлять комментарии.
          <Link
            style={{ textDecoration: "none", color: "#4361ee" }}
            to={"/login"}
          >
            {" "}
            Войдите
          </Link>
          , пожалуйста.
        </Typography>
      )}
    </SideBlock>
  );
};
