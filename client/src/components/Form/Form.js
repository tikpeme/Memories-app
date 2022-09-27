import React, { useState, useEffect } from "react";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import { useNavigate } from "react-router-dom";

const Form = ({
  currentId,
  setCurrentId,
  isTextfieldEmpty,
  setIsTextfieldEmpty,
}) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    location: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const post = useSelector((state) => {
    //within the store, the posts array is looped through to find a post which has an _id that is equal to the current ID (passed into the function vai props), and set that as post
    return currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null;
  });

  console.log(post);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    //accepts two parameters, a call back function and a dependencey array that determins when the call back function should be run, in this case, it's when the post value changes from nothing to actual post
    console.log(isTextfieldEmpty);

    //Use the "useEffect" to populate the values of the form with the information from the psot ID
    if (post && isTextfieldEmpty) setPostData(post);
  }, [user, isTextfieldEmpty, post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //check to see if the current ID is valid, if so dispatch the update function, else dispatch the create post function
    if (currentId) {
      console.log(`Updating and dispatching ${currentId}`);
      console.log(postData);

      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
      location: "",
    });
    setIsTextfieldEmpty(true);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
            setIsTextfieldEmpty(false);
          }}
        />
        {console.log("post data is" + postData.title)}
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
            setIsTextfieldEmpty(false);
          }}
        />
        <div style={{ padding: "5px 0", width: "97%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => {
              handleAddChip(chip);
              setIsTextfieldEmpty(false);
            }}
            onDelete={(chip) => {
              handleDeleteChip(chip);
              setIsTextfieldEmpty(false);
            }}
          />
        </div>
        <TextField
          name="location"
          variant="outlined"
          label="Location"
          fullWidth
          value={postData.location}
          onChange={(e) => {
            setPostData({ ...postData, location: e.target.value });
            setIsTextfieldEmpty(false);
          }}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
              setIsTextfieldEmpty(false);
            }}
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {" "}
          {!currentId ? "Submit" : "Update"}{" "}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          {" "}
          Clear{" "}
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
