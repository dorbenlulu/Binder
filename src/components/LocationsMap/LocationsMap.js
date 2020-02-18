import React, { Component } from "react";
import MapContainer from './MapContainer'
import Locations from './Locations'
import { observer, inject } from 'mobx-react'

@inject("user", "locationsStore", "myProfile", "socketStore")
@observer
class LocationsMap extends Component {
  render() {
    return (
      <>
        <MapContainer /> 
        <Locations />
      </>
    );
  }
}

export default LocationsMap;
