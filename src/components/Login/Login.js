import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Route, Link } from "react-router-dom"
import Locations from "../LocationsMap/Locations"
import MapContainer from "../LocationsMap/MapContainer"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from "axios"
// import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
@inject("generalStore", "user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (input) => (event) => {
        this.setState({
            [input]: event.target.value
        })
    }

    submit = async (event) => {
        event.preventDefault()
        const loginInformation = { address: this.state.email, password: this.state.password }
        const checkIfUserExists = await axios.post('http://localhost:8080/login', loginInformation)
        
        if (checkIfUserExists.data!=="login error") {
            this.props.socketStore.openSocket(checkIfUserExists.data)
            // this.props.socketStore.openSocket(politician.data)
            this.props.user.logIn()
            this.props.generalStore.displayMenu = true
            // Cookies.set('user','loginTrue')
            
        } else {
            alert("Incorrect Email Address/Password")
        }
    }
    //  readCookie=()=>{
    //      const user=Cookies.get('user')
    //  }

    render() {
        const divStyle = {
            marginLeft: "13vw",
            marginTop: "10vh"
        }
        return (
            <div style={divStyle}>
            <MuiThemeProvider>
                {/* {!this.props.user.isLoggedIn ?  */}
                <React.Fragment>

                    <div style ={{ width: "72vw"}}>
                    <Typography variant="h4" gutterBottom>
                     Login
                     </Typography>
                    <TextField
                        placeholder="Enter Your Email"
                        // floatingLabelText="Email"
                        onChange={this.handleChange('email')}
                        value={this.state.email}
                        type="email"
                    />
                    <br />
                    <TextField
                        placeholder="Enter Your Password"
                        // floatingLabelText="Password"
                        onChange={this.handleChange('password')}
                        value={this.state.password}
                        type="password"
                        color={"red"}
                    />
                    <br />
                    <Button label="Submit" variant="contained" color="secondary" onClick={this.submit} style={{marginLeft: "23vw", marginTop:"3vh"}}>Submit</Button>

                    </div>
                    <div style={{marginTop: "5vh", marginLeft: "12vw"}}>
                    <Link to="/register" className="link">
                    <Button variant="contained" color="secondary">Create Account</Button> 
                    </Link> 
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
            </div>
        )
    }
}

const styles = {
    buttons: {
        margin: 15,
        backgroundColor: "#e91e63"

    }
}

export default Login