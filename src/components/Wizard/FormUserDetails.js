import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from 'material-ui';
import Button from '@material-ui/core/Button';
import axios from 'axios';

@inject("generalStore","user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class FormUserDetails extends Component {

    continue = async event => {
        event.preventDefault()
        let emailAddress={address: this.props.values.email}
        let checkEmail= await axios.post('http://localhost:8080/checkEmail', emailAddress )
        if(checkEmail.data=="exists"){
            alert("Email already exists. Did you forget your password?")
        } else {
            this.props.nextStep()
        }
    }
    
    componentDidMount() {
        this.props.generalStore.setHeaderLabel("Enter User Details")
    }

    render() {
        const { values, handleChange } = this.props
        return (
            <div style={{marginLeft: "14vw"}}>
            <MuiThemeProvider>
                <React.Fragment>
                    <TextField
                        // placeholder="Enter Your First Name"
                        floatingLabelText="First Name"
                        onChange={handleChange('firstName')}
                        value={values.firstName}
                        type="text" 
                    />
                    <br />
                    <TextField
                        // placeholder="Enter Your Last Name"
                        floatingLabelText="Last Name"
                        onChange={handleChange('lastName')}
                        value={values.lastName}
                        type="text" />
                    <br />
                    <TextField
                        // placeholder="Enter Your Age"
                        floatingLabelText="Age"
                        onChange={handleChange('age')}
                        value={values.age}
                        type="number" min="18" max="100"/>
                    <br />
                    <TextField
                        // placeholder="Enter Your Email"
                        floatingLabelText="Email"
                        onChange={handleChange('email')}
                        value={values.email}
                        type="email" required />
                    <br />
                    <TextField
                        // placeholder="Enter Your Password"
                        floatingLabelText="password"
                        onChange={handleChange('password')}
                        value={values.password}
                        type="password" required/>
                    <br />
                    <InputLabel id="relationship-status">Relationship Status</InputLabel>
                    <Select
                        labelId="relationship-status"
                        hintText="Enter Your Status"
                        floatingLabelText="Status"
                        onChange={handleChange('status')}
                        defaultValue={values.status}>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="In an open relationship">In an open relationship</MenuItem>
                    <MenuItem value="It's Complicated">It's Complicated</MenuItem>
                    </Select>
                    <br />
                    <Button variant="contained" color="secondary" onClick={this.continue}>Continue</Button>
                </React.Fragment>
            </MuiThemeProvider>
            </div>
        )
    }
}

const styles = {
    buttons: {
        margin: 15
    }
}

export default FormUserDetails