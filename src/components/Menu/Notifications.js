import React, { Component } from 'react'
import { inject } from "mobx-react";
import Emojify from "react-emojione";

@inject ('socketStore')
class Notifications extends Component {

    render() {
        const notifications = this.props.socketStore.notifications
        return (
            <div>
                {
                    notifications.length > 0
                        ? notifications.map( notification => 
                            <span>
                                {notification.time.getHours()}:{notification.time.getMinutes()}:{notification.time.getSeconds()} - {notification.sender} has reacted to you! <Emojify>{notification.emoji}</Emojify><br></br>
                            </span>)
                        : <span style={{textAlign: "center"}}>There are no new notifications<br></br> go react yourself!</span>
                }
            </div>
        )
    }
}

export default Notifications
