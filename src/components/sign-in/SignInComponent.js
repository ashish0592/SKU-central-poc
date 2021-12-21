import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import {
  Paper,
  Typography,
  Button,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Link,
  LinearProgress,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import AccountIcon from '@material-ui/icons/AccountCircle'
import "./sign-in.css";
import Bowser from "bowser";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const materialStyles = (theme) => ({
  button: {
    marginTop: "2rem",
    width: "6rem",
    height: 35,
    padding: "0 5px",
    alignSelf: "center",
  },
  signup: {
    margin: theme.spacing(2),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  warningMessage: {
    width: "100%",
    marginLeft: "17px",
    color: theme.palette.error.dark,
  },
});

class SignInComponent extends Component {
  state = {
    loginInfo: {
      email: "",
      password: "",
    },
    checked: false,
    authProgress: false,
    invalidUser: false,
    signInError: false,
    showPassword: false,
  };

  constructor(props) {
    super(props);
    if(props && props.state && props.state.email) {
      const email = props.state.email;
      if(email) {
        this.state.loginInfo.email = email;
      }
    }
  }; // constructor()

  handleSubmit = () => {
	  this.props.setLogin(true)
  }

  handleChange = (event) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleChangeChecked = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  toggleShowPassword = (event) => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  

  render() {
    const { classes } = this.props;
    const {
      loginInfo,
      checked,
      userData,
      signInError,
      showPassword,
    } = this.state;

    var browsersSupported = ["Chrome", "chrome", "Firefox", "Microsoft Edge"];
    var browserInfo = Bowser.parse(window.navigator.userAgent); // In general userAgent is not reliable. But will do for current purposes.
    var isBrowserSupported = browsersSupported.includes(
      browserInfo.browser["name"]
    );
    if (userData) {
      if(userData.jsStatus == "0" && userData.clientInterview && userData.clientInterview.length > 0) {
        const location = {
          pathname: "/userProfile",
          state: { userData },
        };
        return;
      }
      else if (userData.user === "User" || userData.user === "existingUser") {
        const location = {
          pathname: "/myProfile",
          state: { userData },
        };
        return;
      } else {
        const location = {
          pathname: "/adminHome",
          state: { userData, fromLoginPage: true },
        };
        return;
      }
    }

    if (signInError) {
      const location = {
        pathname: "/userMessageDialog",
        state: { signInError, userData },
      };
      return;
    }

    return (
      <div className="login">
        {this.state.authProgress && (
          <LinearProgress color="secondary" style={{ width: "100%" }} />
        )}
        <Paper className="body">
          <div>
            <AccountIcon style={{ fontSize: "xx-large", color: "#289AD3" }}/>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </div>
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              autoComplete="email"
              label="Username"
              value={loginInfo.email}
              autoFocus
              onChange={this.handleChange}
              required
              disabled={!isBrowserSupported}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              value={loginInfo.password}
              autoComplete="current-password"
              onChange={this.handleChange}
              required
              disabled={!isBrowserSupported}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle passsword visibility"
                      onClick={this.toggleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormHelperText className={classes.warningMessage}>
              {this.state.invalidUser ? "Invalid Username or Password" : ""}
            </FormHelperText>

            <FormControlLabel
              control={
                <Checkbox
                  name="checked"
                  checked={checked}
                  onChange={this.handleChangeChecked}
                  className={classes.checkbox}
                  color="primary"
                  disabled={!isBrowserSupported}
                />
              }
              label="Remember me"
            />

            <Button
              fullWidth
              variant="contained"
              style={{backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', float:'right'}}
              className={classes.button}
              type="submit"
              disabled={!isBrowserSupported}
            >
              Sign in
            </Button>
          </form>

          {isBrowserSupported && (
            <Link href="/passwordReset" className={classes.link}>
              <Typography variant="subtitle2">Forgot Password?</Typography>
            </Link>
          )}
          <br />
          <br />
          {!isBrowserSupported && (
            <div>
              <br />
              <br />
            </div>
          )}
          <Typography
            component="h4"
            variant="subtitle2"
            className="browserInfo"
          >
            <center>
              You are using {browserInfo.browser["name"]}{" "}
              {browserInfo.browser["version"]}.
            </center>
            <center>
              Chrome browser is supported. Other browsers will be supported in
              future versions.
            </center>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(materialStyles)(SignInComponent);
