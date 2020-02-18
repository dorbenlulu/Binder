import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
// import Switch from '@material-ui/core/Switch';
import "./Settings.css";
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      newEmail: '',
      password: '',
      verifiedPassword: '',
      openPasswordSlide:false,
      openEmailSlide:false,
      openNotificationSettings: false,
      checked: false,
      passwordErrorMessage:'',
      errorMessage: '',
      styles: {
        underline: {
          "&:before": {
            borderBottom: "1px solid #e91e63"
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: "2px solid #e91e63"
          },
          "&:after": {
            borderBottom: "1px solid #c1114d"
          }
        },
        disabled: {},
        focused: {},
        error: {}
      }
    };

    // this.input = React.createRef()
  }

  handleClose = (event) => {
    const {name} = event.target
    console.log(`in handle close: name is ${name}`);
    this.setState({ [name]: false });
  };

  handleOpen = (name) => {
    //   const {name} = event.target
    console.log(`in handle open: name is ${name} `);
    const value = this.state[name]
    this.setState({ [name]: !value });
  };

  handleInputChange = (event) => {
    // event.preventDefault()
      const {name, value} = event.target
      console.log(`In handleInputChange: name is ${name}, and value is ${value}`);
      
      this.setState({[name]: value}, () => {
        //   this.input.current.focus()
      })
  }
  useStyles = () =>
    makeStyles(theme => ({
      paper: {
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
      }
    }));

  handleMailSubmit = event => {
    event.preventDefault();
    console.log("email changeed");
    this.setState({
        openEmailSlide: false,
        openPasswordSlide: false
    })
    // send a post reques to the server
  };

  StyleInput = () => withStyles(this.state.styles)(Input);
  openUpdateMailSlide = () => {

    const StyleInput = this.StyleInput();

    return (
      <Slide direction="left" in={this.state.openEmailSlide} mountOnEnter unmountOnExit>
        <Paper elevation={4}>
          <form
            onSubmit={this.handleMailSubmit}
            style={{ verticalAlign: "middle" }}
          >
            {/* <TextField id="standard-basic" label={label} style={{fontSize: "3vw" }} after classes={after}  /> */}
            < Input 
              placeholder="New Email"
              value={this.state.newEmail}
              name="newEmail"
              inputProps={{ "aria-label": "description" }}
              underline={{ after: { borderBottom: "2px solid  red" } }}
            //   ref={this.input}
              onChange={this.handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ height: "5vh", fontSize: "3vw" }}
            >
              Update Email
            </Button>
          </form>
          <div style={{color:"red"}}>{this.state.errorMessage}</div>
        </Paper>
      </Slide>
    );
  };

  handlePasswordSubmit = (event) => {
      event.preventDefault()

      if (this.state.password === this.state.verifiedPassword) {
        console.log("Updating Password!");
        this.setState({
            openPasswordSlide: false
        })
        
      } else {
          this.setState({passwordErrorMessage: "Passwords must match!"})
      }

  }
  openUpdatePasswordSlide = () => {

    const StyleInput = this.StyleInput();

    return (
      <Slide direction="left" in={this.state.openPasswordSlide} mountOnEnter unmountOnExit>
        <Paper elevation={4}>
          <form
            onSubmit={this.handlePasswordSubmit}
            style={{ verticalAlign: "middle" }}
          >
            {/* <TextField id="standard-basic" label={label} style={{fontSize: "3vw" }} after classes={after}  /> */}
            <Input
              placeholder="Type in your new password"
              type="password"
              value={this.state.password}
              name="password"
              
              inputProps={{ "aria-label": "description" }}
              underline={{ after: { borderBottom: "2px solid  red" } }}
              onChange={this.handleInputChange}
              />
            <Input
              placeholder="Varify password"
              type="password"
              value={this.state.verifiedPassword}
              name="verifiedPassword"
              inputProps={{ "aria-label": "description" }}
              underline={{ after: { borderBottom: "2px solid  red" } }}
              onChange={this.handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ height: "5vh", fontSize: "3vw" }}
            >
              Default
            </Button>
          <div style={{color:"red"}}>{this.state.passwordErrorMessage}</div>
          </form>
        </Paper>
      </Slide>
    );
  }

  render() {
    const classes = this.useStyles();

    const modalStyle = {
      position: "relative",
      top: `20%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      backgroundColor: "white"
    };

    const slideStyle = {
      position: "absolute",
      width: "100%",
      height: "100vh"
    };

    const divStyle = {
      width: "100%",
      backgroundColor: "#ece9e95e"
    };
     
    // if (this.input.current) {
    //     this.input.current.focus()
    // }

    return (
      <div>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders"
          style={divStyle}
        >
          <ListItem
            button
            value={"Update Email"}
            name="openEmailSlide"
            onClick={() => this.handleOpen("openEmailSlide")}
            style={{ borderBottom: "1px solid #0000002e" }}
            >
            <ListItemText primary={"Update Email"} />
          </ListItem>
          {this.state.openEmailSlide ? this.openUpdateMailSlide() : null}
          <ListItem
            button
            value={"Update Password"}
            name="openPasswordSlide"
            onClick={() => this.handleOpen("openPasswordSlide")}
            style={{ borderBottom: "1px solid #0000002e" }}
          >
            <ListItemText primary={"Change Password"} />
          </ListItem>
          {this.state.openPasswordSlide ? this.openUpdatePasswordSlide("New email") : null}
          <ListItem
            button
            value={"Notification Settings"}
            name="openNotificationSettings"
            onClick={() => this.handleOpen("openNotificationSettings")}
            style={{ borderBottom: "1px solid #0000002e" }}
          >
            <ListItemText primary={"Notification Settings"} />
          </ListItem>
          {this.state.openNotificationSettings ? this.openUpdatePasswordSlide("New email") : null}
          <ListItem
            button
            value={"Do Not Disturb"}
            
            // onClick={() => this.handleOpen("doNotDisturb")}
            style={{ borderBottom: "1px solid #0000002e" }}
          >
            <ListItemText primary={"Do Not Disturb"} />
          <Switch
          name="doNotDisturb"
            checked={this.state.doNotDisturb}
            onChange={this.handleInputChange}
            value="checkedB"
            color="primary"
          />
          </ListItem>
        </List>

      </div>
    );
  }
}

export default Settings;
