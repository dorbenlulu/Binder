import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import EmptyProfilePicture from "../dummyImage/Empty.jpg";
import Footer from "./Footer";

@inject( "generalStore", "user", "usersStore", "locationsStore", "myProfile", "socketStore" )
@observer
class Users extends Component {
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
        width: 500,
        height: 450
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    }));
  };

  render() {
    const nearbyUsers = this.props.socketStore.nearbyUsers;
    const currentLocation = this.props.match.params.location;
    const divStyle = {
      height: "80vh",
      width: "90vw",
      marginTop: "1vh",
      marginLeft: "5vw"
    };
    const classes = this.useStyles();
    // send yoni the location and then load a loading bar and when the loading finishes - rendering the users
    return (
      <>
        <div className={classes.root} style={divStyle}>
          <GridList cellHeight={180} className={classes.gridList}>
            {Object.keys(nearbyUsers).map((key, index) => (
              
             // if(!nearbyUsers[key]._id == this.props.socketStore.loggedInUse ){ 
      
                <GridListTile
                  key={nearbyUsers[key].firstName}
                  onClick={() => this.props.history.push(`/user/${nearbyUsers[key]._id}`)}
                >
                  {console.log("user url is ", nearbyUsers[key].picture)}
                  {nearbyUsers[key].picture !== null ? 
                    <img src={nearbyUsers[key].picture} alt={nearbyUsers[key].firstName} />
                    : 
                    <img src={EmptyProfilePicture} alt={nearbyUsers[key].firstName} />
                  }
                  <GridListTileBar
                    style={{ height: "auto" }}
                    title={`${nearbyUsers[key].firstName}, ${nearbyUsers[key].age}`}
                    actionIcon={
                      <IconButton aria-label={`info about ${nearbyUsers[key].firstName}`} className={classes.icon} >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
                
              //    }
                )
              )
            }
          </GridList>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(Users);
