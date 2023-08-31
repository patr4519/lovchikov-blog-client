import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./AddComment.module.scss";
import axios from "../../axios";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({ refreshPage }) => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data);
  const [comment, setComment] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    try {
      if (!comment) {
        return;
      }

      setIsLoading(true);

      const newComment = {
        user: {
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
        },
        text: comment,
        date: new Date(),
      };

      await axios.patch(`/add-comment/${id}`, { comment: newComment });

      setComment("");
      refreshPage();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            disabled={isLoading}
            onClick={handleClick}
            variant="contained"
          >
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
