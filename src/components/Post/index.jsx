import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemovePost, handleLike } from "../../redux/slices/posts";
import axios from "../../axios";

export const Post = ({
  id,
  title,
  text,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  likes,
  userLikes,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.data);
  const userId = userData?._id;

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispath(fetchRemovePost(id));
    }
  };

  const handleLikeClick = async (id) => {
    if (!userData) {
      navigate("/login");
      return;
    }
    try {
      await axios.patch(`/likeClick/${id}`, { userId: userData._id });
      dispath(handleLike({ postId: id, userId: userData._id }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} createdAt={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {text ? `${text.slice(0, 100)}...` : ""}
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
            <li>
              {userLikes?.includes(userId) ? (
                <ThumbUpIcon
                  sx={{ color: "green" }}
                  onClick={() => handleLikeClick(id)}
                />
              ) : (
                <ThumbUpOffAltIcon onClick={() => handleLikeClick(id)} />
              )}
              <span>{likes}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
