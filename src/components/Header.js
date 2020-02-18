import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EmptyProfilePicture from "../dummyImage/Empty.jpg";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SettingsIcon from "@material-ui/icons/Settings";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from "@material-ui/icons/Notifications";

@inject("generalStore", "user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Header extends Component {
  constructor() {
    super()
    this.state = {
      left: false
    }
  }
  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ left: open })
  };

  uploadImage = (event) => {
    // make a POST request!
  }

  sideList = side => {
    const classes = this.useStyles()
    const loggedInUser = this.props.socketStore.loggedInUser
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              this.toggleDrawer(side, false);
            }}
          >
            <ListItemIcon>
              <ArrowBackIosIcon />
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItem>
          <ListItem>
            <label for="image">
              <input type="file" name="image" id="image" style={{ display: "none" }} onChange={this.uploadImage} />
              <img src={loggedInUser ? loggedInUser.picture : EmptyProfilePicture} style={{ width: "30vw", height: "30vw", paddingLeft: "5vw" }} />
            </label>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PermIdentityIcon />
            </ListItemIcon>
            <Link to="/editProfile"><ListItemText primary={"Edit Profile"} /></Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Link to="/settings"><ListItemText primary={"Settings"} /></Link>
          </ListItem>
          <ListItem button onClick={this.initializeCounter}>
            <ListItemIcon>
              {
                this.props.socketStore.notificationsAmt > 0
                  ? <Badge badgeContent={this.props.socketStore.notificationsAmt} color="primary"> <NotificationsIcon />
                  </Badge>
                  : <Badge badgeContent={0} color="primary"> <NotificationsIcon />
                  </Badge>
              }
            </ListItemIcon>
            <Link to="/notifications"> <ListItemText primary={'Notifications'} /> </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Link to="/"><ListItemText primary={"Back"} /></Link>
          </ListItem>
        </List>
        <Divider />
      </div>
    )
  }
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        flexGrow: 1
      },
      list: {
        width: 250
      },
      fullList: {
        width: "auto"
      }
    }))
  }
  render() {
    const classes = this.useStyles();
    const appBarStyle = {
      backgroundColor: "#e91e63"
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" style={appBarStyle}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {this.props.generalStore.displayMenu ? <MenuIcon onClick={this.toggleDrawer("left", true)} /> : null}
              <Drawer open={this.state.left} onClose={this.toggleDrawer("left", false)}>
                {console.log("state.left is ", this.state.left)}
                {this.sideList("left")}
              </Drawer>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {this.props.generalStore.headerLabel}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header