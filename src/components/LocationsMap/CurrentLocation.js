import React from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from "mobx-react";
// import { Link } from "react-router-dom";
import axios from 'axios';
// 

const apiKey = process.env.API_KEY

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    top: "10vh"
  }
};


@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer


class CurrentLocation extends React.Component {

    constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        }; 
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap()
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap()
        }
      }

      recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng);
          map.panTo(center);
        }
      }

      componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( pos => {
              // c  onst coords = pos.coords;
              const coords = { //don't accept this change! this is for vicki's computer, and uncomment the line above
                latitude: 32.0628992,
                longitude: 34.7736213
              }
              const coordinates={lat:coords.latitude,lng :coords.longitude }
              this.getCheckIn(coordinates)
              // this.getLocations(coordinates)
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              }, function(){
                
                this.props.socketStore.getLocationsNearby(this.state.currentLocation)
              })
            })
          }
        }
        this.loadMap();
      }

      getCheckIn= (coordinates) => {
        axios.post('/', coordinates)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      // getLocations=async (coordinates)=>{
      //   const response = await axios.get(`/maps/api/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&radius=100&type=bar&key=${apiKey}`);
        
      //   console.log(response)
      //   let places=[]
      //   places=response.data.results.map(item=> item.name)
      //   console.log(places)
      // }

      loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
    
          const mapRef = this.refs.map;
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);
    
          let { zoom } = this.props;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
    
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
      }

      renderChildren() {
        const { children } = this.props;
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        });
      }

      render() {
        console.log(this.state)
        const style = Object.assign({}, mapStyles.map);
        
       return (
         <div>
           <div style={style} ref="map">
             Loading map...
           </div>
           {this.renderChildren()}
         </div>
       );
     }

}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 32.0628435,
    lng: 34.7735121
  },
  centerAroundCurrentLocation: false,
  visible: true
};