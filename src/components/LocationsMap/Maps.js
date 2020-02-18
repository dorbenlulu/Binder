import React, { Component } from 'react';

class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            userAdress: null
        }
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    getCoordinates = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }
    handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
        }
    }

    render() {

        return (
            <div>
                <button onClick={this.getLocation} > GET LOCATION</button>
                <div>Latitude : {this.state.latitude}</div>
                <div>Longitude : {this.state.longitude}</div>
                <div> Adress: {this.state.userAdress}</div>
                {
                    this.state.latitude && this.state.longitude ?
                        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},
                ${this.state.latitude}&zoom=20&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},
                ${this.state.latitude}&key=AIzaSyBfabs7hjM38iufAEGazLloZUS9t9DfUy8`} /> : null
                }

            </div>
        );
    }
}

export default Maps;