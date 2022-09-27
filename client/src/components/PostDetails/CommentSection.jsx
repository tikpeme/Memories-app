import { TextField, Typography, Button, Paper } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

import { commentPost } from "../../actions/posts";
import { useEffect } from "react";

function CommentSection({ post }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = () => {
    const finalComment = `${user.result.name} : ${comment}`;

    dispatch(commentPost(finalComment, post._id));
  };
  console.log(post);

  const classes = useStyles();

  //check if user is logged in
  useEffect(() => {
    if (post?.comments?.length > 0) {
      setComments(post.comments);
    }
  }, []);

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            {" "}
            Comments
          </Typography>
          {comments.map((comment, index) => (
            <Typography key={index} variant="subtitle1">
              comment{index}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              {" "}
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
