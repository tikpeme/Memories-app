import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { MdLocationPin } from "react-icons/md";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId, setIsTextfieldEmpty }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography
            variant="h6"
            style={{
              border: "1px solid red",
              whiteSpace: "nowrap",
              overflow: "scroll",
              height: "2rem",
              width: "8.5rem",
            }}
          >
            {post.name}
          </Typography>
          <Typography variant="body2" style={{ position: "absolute" }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
                setIsTextfieldEmpty(true);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}

        <div className={classes.detailSections}>
          <div className={classes.tagsSection}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <hr style={{ padding: "0px" }} />

          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h5" gutterBottom>
              {post.title}
            </Typography>
          </div>
          <hr style={{ padding: "0px" }} />
          <CardContent className={classes.messageSection}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              //noWrap="true"
            >
              {post.message}
            </Typography>
          </CardContent>
          <div className={classes.location}>
            <MdLocationPin />
            <Typography variant="body2" color="textSecondary" component="p">
              {post.location}
            </Typography>
          </div>
        </div>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
