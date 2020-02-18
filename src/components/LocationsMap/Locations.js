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
    // const realLocationArray = this.props.locationsStore.locations
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
    // const containerStyle = {
    //   position: "relative",
    //   overflow: "hidden",
    //   height: "40vh",
    //   width: "100vw",
    //   backgroundImage: `url(${user ? user.picture : null })`,
    //   backgroundPosition: "center",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat"
    // };
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
                  {/* <img src={`${user ? user.picture : null }`} alt="Avatar" style={imageStyle}/> */}
                  <div style={overlayStyle}>{location.name}</div>
                </div>
              
            );
          })}
        </div>
      </>
    );
    //     return (

    //       <List
    //         component="nav"
    //         className={classes.root}
    //         aria-label="mailbox folders"
    //         style={divStyle}
    //       >
    //         <h3>Where Are You?</h3>
    //         {locationsArray.map((location, i) => (
    //           <ListItem key={i} button value={location} onClick={() => this.sendLocation(location)}>
    //             <Link to={`/map/${location.name}`} >
    //               <ListItemText primary={location.name} />
    //               <img src={location.picture} height="200" />
    //             </Link>
    //           </ListItem>
    //         ))}
    //       </List>
    //     );
  }
}

export default withRouter(Locations);

// import React, { Component } from "react";
// import { observer, inject } from "mobx-react";
// import image from "../dummyImage/dummyMap.PNG";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Divider from "@material-ui/core/Divider";

// @inject("generalStore", "user", "usersStore", "locationsStore", "myProfile", "socketStore")
// @observer

// class Locations extends Component {
//   useStyles = () => {
//     return makeStyles(theme => ({
//       root: {
//         width: "100%",
//         maxWidth: 360,
//         backgroundColor: theme.palette.background.paper
//       }
//     }));
//   };
//   sendLocation = (location) => {
//     this.props.user.checkin()
//     this.props.socketStore.SelectedLocationCoordinates = location.locationCoordinates
//     this.props.socketStore.watchPosition()
//     this.props.socketStore.getUsersNearMe(location.name)
//     this.props.generalStore.setHeaderLabel(location.name)
//   }

//   componentDidMount() {
//     this.props.generalStore.setHeaderLabel('Binder')
//   }

//   render() {
//     // const realLocationArray = this.props.locationsStore.locations
//     // function that gets locations from yoni
//     const locationsArray = this.props.socketStore.nearbyLocations;
//     const divStyle = {
//       position: "absolute",
//       top: "47%",
//       width: "100%",
//       backgroundColor: "#ece9e95e"
//     };

//     const classes = this.useStyles();
//     return (

//       <List
//         component="nav"
//         className={classes.root}
//         aria-label="mailbox folders"
//         style={divStyle}
//       >
//         <h3>Where Are You?</h3>
//         {locationsArray.map((location, i) => (
//           <ListItem key={i} button value={location} onClick={() => this.sendLocation(location)}>
//             <Link to={`/map/${location.name}`} >
//               <ListItemText primary={location.name} />
//               <img src={location.picture} height="200" />
//             </Link>
//           </ListItem>
//         ))}
//       </List>

//     );
//   }
// }

// export default Locations;
