import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Emojify from "react-emojione"
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Emoji extends Component {

  handleClick = label => {
    const userId = this.props.match.params.id;
    console.log('userId', userId)
    const user = this.props.socketStore.getUserById(userId);

    const reactionObj = {
      label,
      destinationUser: user,
      sourceUser: this.props.socketStore.loggedInUser
    };

    this.props.socketStore.sendReaction(reactionObj)
    this.setState({
      blockTimer: true
    })
  }

 
  render() {
    const userId = this.props.match.params.id;
    const user = this.props.usersStore.getUserById(userId)

    let blockTimer = false
    this.props.socketStore.nearbyUsers.forEach(u => {
      if (u._id === userId & u.blockTimer){
        blockTimer = u.blockTimer
      }
    });

    return (
 
      <div style={{marginLeft: "20vw", marginTop: "5vh"}}>
        
        { blockTimer ? 
        <div>
            <Emojify
              style={{ height: 32, width: 32, opacity:'0.4' }}
            >
              :heart:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32, opacity:'0.4' }}
            >
              :fire:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32, opacity:'0.4' }}
            >
              :heart_eyes:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32, opacity:'0.4' }}
            >
              :blush:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32, opacity:'0.4' }}
            >
              :(
            </Emojify>
          </div>

            :

          <div>
            <Emojify
              style={{ height: 32, width: 32 }}
              onClick={() => this.handleClick(":heart:")}
            >
              :heart:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32 }}
              onClick={() => this.handleClick(":fire:")}
            >
              :fire:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32 }}
              onClick={() => this.handleClick(":heart_eyes:")}
            >
              :heart_eyes:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32 }}
              onClick={() => this.handleClick(":blush:")}
            >
              :blush:
            </Emojify>
            <Emojify
              style={{ height: 32, width: 32 }}
              onClick={() => this.handleClick(":(")}
            >
              :(
            </Emojify>
          </div>
        }
      </div>
    );
  }
}

export default Emoji;
