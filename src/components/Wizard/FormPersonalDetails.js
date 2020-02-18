import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { StylesProvider, InputLabel, Input } from '@material-ui/core';
import { MenuItem } from 'material-ui';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import {storage} from '../../config/fireBaseConfig'
import Button from '@material-ui/core/Button';

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class FormPersonalDetails extends Component {
    state = {
        Men: false,
        Women: false,
        url:""
    }

    continue = event => {
        event.preventDefault()
        this.props.nextStep()

    }

    back = event => {
        event.preventDefault()
        this.props.previousStep()

    }

    uploadImage = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    uploadFile =  () => {
        if(this.state.selectedFile){
            let image = this.state.selectedFile
            
            const uploadTask= storage.ref(`images/${image.name}`).put(image)
            uploadTask.on('state_changed', (snapshot)=>{
                console.log(snapshot)
            }, (error)=> {
                console.log(error);
                
            }, ()=>{
                storage.ref('images').child(image.name).getDownloadURL().then(url=> {
                    
                    this.setState({
                        url
                    }, function(){
                    this.props.handleChange('picture')(this.state.url)
                    })
                })
            })
        }
    }

    render() {
            
            const { values, handleChange, upload } = this.props
            const divStyle = {
                marginLeft: "18vw",
                marginTop: "10vh",
                width: "60vw"
            }
            return (
                <div style={divStyle}>
                <MuiThemeProvider>
                    <React.Fragment>
                        <InputLabel id="desired-relationship-label">What Are You Looking For?</InputLabel>
                        <Select labelId="desired-relationship-label" label="What Are You Looking For?"
                            hintText="Enter Your Desdired Relationship"
                            floatingLabelText="desiredRelationship"
                            onChange={handleChange('desiredRelationship')}
                            value={values.desiredRelationship} autoWidth>
                            <MenuItem value="True Love">True Love</MenuItem>
                            <MenuItem value="Hookups">Hookups</MenuItem>
                        </Select>
                        <br />

                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Who Are You Looking For?</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange('interestedIn')} value="Men" />}
                                    label="Men"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange('interestedIn')} value="Women" />}
                                    label="Women"
                                />
                            </FormGroup>

                        </FormControl>

                        <br />
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select labelId="gender-label" label="gender"
                            hintText="How Do You Define Yourself?"
                            floatingLabelText="Gender"
                            onChange={handleChange('gender')}
                            value={values.gender} autoWidth>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Gender Fluid">Gender Fluid</MenuItem>
                        </Select>

                        <br />
                        <InputLabel id="picture-label">Picture</InputLabel>
                        <FormGroup >
                            <Input type="file" floatingLabelText="Picture" onChange={this.uploadImage}
                                defaultValue={values.picture} />
                            <RaisedButton label="Upload" primary={false} style={styles.button} onClick={this.uploadFile} />
                        </FormGroup>
                        <br />
                        <Button variant="contained" color="primary" style={styles.button} onClick={this.continue} >Continue</Button>
                        <Button variant="contained" color="secondary" style={styles.button} onClick={this.back} >Back</Button>
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

    export default FormPersonalDetails