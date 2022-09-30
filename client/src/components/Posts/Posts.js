import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, setIsTextfieldEmpty }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts available";
  //console.log(isLoading);

  return isLoading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={1}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            setIsTextfieldEmpty={setIsTextfieldEmpty}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
