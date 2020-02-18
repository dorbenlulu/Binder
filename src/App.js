import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { observer, inject } from 'mobx-react'
import './App.css';
import Login from "./components/Login/Login"
import Users from "./components/Users"
import LocationsMap from './components/LocationsMap/LocationsMap'
import Profile from './components/Profile/Profile'
import UserForm from "./components/Wizard/UserForm"
import Tap from './components/Tap'
import Header from './components/Header'
import Settings from './components/Menu/Settings/Settings'
import Notifications from './components/Menu/Notifications';
import EditProfile from "./components/Menu/EditProfile"
import { messaging } from "./init-fcm";

require('dotenv').config()

@inject("user", "locationsStore", "myProfile", "socketStore")
@observer
class App extends Component { 

    async componentDidMount() {
        messaging.requestPermission()
        .then(async () => {
            const token = await messaging.getToken()
            this.props.socketStore.userNotificationToken = token
            this.props.socketStore.pushNotification()
        })
        .catch(function(err) {
            console.log("Unable to get permission to notify.", err)
        })
        navigator.serviceWorker.addEventListener("message", (message) => console.log(message))
        this.props.socketStore.recieveMessage()
    }

    render() {

        return (
            <Router>
                {this.props.socketStore.checked
                    ? <Tap />
                    : <div id="main-container">
                        <Header />
                        {console.log(this.props.socketStore.nearbyUsers)}
                        {!this.props.user.isLoggedIn ?
                            <Route path="/" exact render={({ match }) => <Login match={match} />} /> : <Route path="/" exact render={({ match }) => <LocationsMap match={match}/>} />} 
                        <Route path="/register" exact render={({ match }) => <UserForm match={match} />} />
                        {this.props.user.isCheckedIn ? <Route path="/map/:location" exact render={({ match }) => <Users match={match} />} /> : null }
                        <Route path="/user/:id" exact render={({ match }) => <Profile match={match} />} />
                        <Route path="/editProfile" exact render={({match}) => <EditProfile />}/>
                        <Route path="/settings" exact render={({match}) => <Settings />}/>
                        <Route path='/notifications' exact render={({ match }) => <Notifications match={match} />} /> 
                    </div>
                }
            </Router>
        );
    }
}



export default App