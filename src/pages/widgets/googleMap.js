/* eslint-disable no-undef */
import React from "react";
import axios from 'axios'
import PropTypes from "prop-types";

const API_KEY = "AIzaSyC0W_7Xof88qi51CnXgWEJVSOxyJFeKzME ";

class GoogleMap extends React.PureComponent {
  constructor(){
    super();
    this.state = {}
  }
  componentDidMount() {
    this.updateMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.updateMap();
    }
  }

  getGeocode() {
    const address = encodeURIComponent(this.props.address);
    const requestUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

    return axios.get(requestUri);
  }

  updateMap() {
    const addressToSearch = (this.props.address || "").trim();
    if (!addressToSearch) {
      return;
    }
    this.getGeocode().then(response => {
      const { results } = response.data;
      if (results.length) {
        const {
          geometry: { location }
        } = results[0];
        this.setState({location:location.lat})
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        this.map = new google.maps.Map(this.mapContainer);
        this.map.setCenter(latLng);
        this.map.setZoom(8);
        this.marker = new google.maps.Marker({
          map: this.map,
          position: latLng
        });
      }
    });
  }

  updateMapContainerRef = ref => {
    this.mapContainer = ref;
  };

  render() {
    return (
      <div className='col-md-4 h-100'>
        <div
        ref={this.updateMapContainerRef}
        className='w-100 h-100'
        />
      </div>
      
    );
  }
}

GoogleMap.propTypes = {
  address: PropTypes.string
};

export default GoogleMap;
