import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
@inject(
  "generalStore",
  "user",
  "usersStore",
  "locationsStore",
  "myProfile",
  "socketStore"
)
@observer
class Locations extends Component {
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
      },
      gridList: {
        width: "100vw",
        height: 450
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    }));
  };
  sendLocation = location => {
    this.props.user.checkin();
    this.props.socketStore.SelectedLocationCoordinates =
      location.locationCoordinates;
    this.props.socketStore.watchPosition();
    this.props.socketStore.getUsersNearMe(location.name);
    this.props.generalStore.setHeaderLabel(location.name);
    this.props.history.push(`/map/${location.name}`)
  };

  componentDidMount() {
    this.props.generalStore.setHeaderLabel("Binder");
  }

  render() {
    // function that gets locations from yoni
    const locationsArray = this.props.socketStore.nearbyLocations;
    const divStyle = {
      position: "absolute",
      top: "51%",
      width: "100%",
      backgroundColor: "#ece9e95e"
    };

    const classes = this.useStyles();
    const overlayStyle = {
      position: "absolute",
      background: "rgb(6, 6, 6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      width: "100%",
      opacity: "0.7",
      fontSize: "6vw",
      textAlign: "center",
      bottom: "0px",
      height: "6vh"
    };

    return (
      <>
        <div className={classes.root} style={divStyle}>
          {locationsArray.map((location, index) => {
            const containerStyle = {
              position: "relative",
              overflow: "hidden",
              height: "25vh",
              width: "100vw",
              backgroundImage: `url(${location ? location.picture : null})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            };
            return (
              
                <div style={containerStyle} key={index} onClick={() => this.sendLocation(location)}>
                  <div style={overlayStyle}>{location.name}</div>
                </div>
              
            );
          })}
        </div>
      </>
    );
  }
}

export default withRouter(Locations);
