import React, { useState } from "react";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./input";
import Icon from "./icon";

function Auth() {
  const classes = useStyles();
  let [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const googleSuccess = (res) => {
    console.log(res);
  };
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  const switchMode = () => {
    setIsSignup((PrevMode) => !PrevMode);
    handleShowPassword(false);
  };

  console.log(isSignup);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Grid xs={6} md={12}></Grid>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                ></Input>
                <Input
                  name="Lastname"
                  label="First Name"
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <GoogleLogin
            clientId="709762046847-hi8jq870kagcm47o3j8vb9b4fmq6tov5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disable={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
