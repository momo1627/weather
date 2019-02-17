import React from 'react'

function currentLocation(props){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            var coords = position.coords;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyC0W_7Xof88qi51CnXgWEJVSOxyJFeKzME`)
            .then(response=>{return response.data})
            .then(response=>{ return result = response.results[0].address_components})
            .then(response=>{
                response.map(item=>{
                    if(item.types[0] === "administrative_area_level_1"){
                        return item.long_name
                    }
                })
            })
            .then(response=>{
                this.state.search = response;
            })
        });
      } 
}