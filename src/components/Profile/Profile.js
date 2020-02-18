import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {Redirect} from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import {withRouter} from 'react-router-dom';
import Emoji from "./Emoji";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Profile extends Component {
  constructor(){
    super()
    this.state = {
      redirect: false
    }
  }
  
  render() {
    console.log(this.props.match)
    console.log(this.props.socketStore.nearbyUsers)  
    const userId = this.props.match.params.id;
    console.log(`user id `, userId);
    const user = this.props.socketStore.getUserById(userId)
    const chosenLocation = this.props.socketStore.chosenLocation
    console.log(`user to display is `, user);

    const containerStyle = {
      position: "relative",
      overflow: "hidden",
      height: "40vh",
      width: "100vw",
      backgroundImage: `url(${user ? user.picture : null })`, 
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    };

    const overlayStyle = {
      position: "absolute",
      top: "0px",
      background: "#ffffff",
      color: "white",
      width: "auto",
      opacity: "0.7",
      fontSize: "4vw",
      textAlign: "left",
      borderRadius: "50px",
      top: "2vh",
      left: "2vw"
    }

    const iconStyle = {
      verticalAlign: "-10%",
      color:"#040404d9",
      height: "3vh"
    }

    const userInfoStyle = {
      textIndent: "5vw",
      marginTop: "3vh",
      height: "3vh"
    }

    const headlineStyle = {
      color: "#6d6b6b"
    }
    return (
      <div>
        <div style={containerStyle}>
          <div style={overlayStyle} onClick={() => this.props.history.goBack()}><ArrowBackIcon style={{color: "black"}} /></div>
        </div>
        {user ? 
        <div style={userInfoStyle}>
        <Typography variant="h6" gutterBottom>
         {user.firstName}, {user.age}
        </Typography>
        <Typography variant="subtitle2" style={headlineStyle} gutterBottom>
        <PermIdentityIcon style={iconStyle} /> {user.status}
        </Typography>
        <Typography variant="subtitle2" style={headlineStyle} gutterBottom>
          <InfoIcon style={iconStyle} /> Looking for: {user.desiredRelationship}
        </Typography>
        <Emoji match={this.props.match}/>
        </div>
        : <Redirect to={`/map/${chosenLocation}`} /> } 
      </div>
    );
  }
}

export default withRouter(Profile);
