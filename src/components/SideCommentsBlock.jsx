import React from "react";
import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { calculateTimePassed } from "../functions/calculateTimePassed";

const styles = {
  userDetails: {
    display: "flex",
    flexDirection: "column",
  },
  fullName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: "14px",
    color: "#666",
  },
  text: {
    fontSize: "16px",
    margin: "5px 0",
  },
  listItem: {
    margin: '0',
  }
};

export const SideCommentsBlock = ({ items, isLoading = true }) => {
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
                  <ListItemText style={styles.listItem}>
                    <div style={styles.contentWrapper}>
                      <div style={styles.userDetails}>
                        <span style={styles.fullName}>{obj.user.fullName}</span>
                        <span style={styles.timeAgo}>
                          {calculateTimePassed(obj.date) + " назад"}
                        </span>
                      </div>
                      <p style={styles.text}>{obj.text.length > 80 ? `${obj.text.slice(0, 80)}...` : obj.text}</p>
                    </div>
                  </ListItemText>
                  <Link to={`/posts/${obj._id}`}>
                    <TouchAppIcon />
                  </Link>
                </>
              )}
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};
