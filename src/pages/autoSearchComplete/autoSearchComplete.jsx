import React from 'react'
import Predictions from './predictions'
import Current from '../widgets/currentWeather'
import Forecast from '../widgets/forecastWeather';
import GoogleMap from '../widgets/googleMap'
import Alert from './alert'
import moment from 'moment'
import axios from 'axios'
const API_Key = '2e46c90e0de84f11b2982226191302';
export default class Weather extends React.Component{
    constructor(){
        super();
        this.state = {
            search:'',
            autoSearch:{
                input: '',
                predictions : [],
                isPredicting : false,
            },
            location:'location',
            localtime:'current time',
            currentWeather:{},
            foreCastWeather:{},
            isLoading:false,   
            days:1,        
            isError:false,
        }
    }
    currentLocation =()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                var coords = position.coords;
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyC0W_7Xof88qi51CnXgWEJVSOxyJFeKzME`)
                .then(response=>{return response.data})
                .then(response=>{ 
                    return response.results[0].address_components})
                .then(response=>{
                    
                    response.map(item=>{
                        if(item.types[0] === "administrative_area_level_2"){
                            this.setState({
                                search : item.short_name,
                                autoSearch:{
                                    input: item.short_name
                                }
                            })
                            return 
                        }
                    })
                })
            });
          } 
    }
    select = (item) =>{
        this.state.autoSearch.predictions.map(i=>{
            if(i.id === item.id ){
                this.setState({
                    autoSearch:{
                        ...this.state.autoSearch,
                        input:item.name,
                        isPredicting:false,
                        predictions:[],
                    },
                    search:item.name
                })
            }
        })
        
    }
    handleChange = (e)=>{
        const input = e.target.value;
        this.setState({
            search:'',
            autoSearch:{
                ...this.state.autoSearch,
                input:input,
                isPredicting:true,
            },
        })
        if (input !== ''){
            fetch(`http://api.apixu.com/v1/search.json?key=${API_Key}&q=${input}`,{method:"GET"})
            .then(
                (data)=>{return data.json()}
            ).then(
                (data)=>{
                    this.setState({
                        autoSearch:{
                            ...this.state.autoSearch,
                            predictions:data
                        }}
                        )
                })
        }
        
    }
    handleSelect = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]:value
        })
    }
    handleSubmit = ()=>{
        if(this.state.search === "" || this.state.autoSearch.input === '' || this.state.search !==this.state.autoSearch.input){
            this.setState({
                isError:true,
            })
            return false
        }
        const input = this.state.search;
        fetch(`http://api.apixu.com/v1/forecast.json?key=${API_Key}&q=${input}&days=5`,{method:"GET"})
        .then(
            (data)=>{return data.json()}
        ).then(
            (data)=>{
                this.setState({
                    isLoading:true,
                    currentWeather:{
                        ...data.current
                    },
                    foreCastWeather:{
                        ...data.forecast
                    },
                    localtime:moment(data.location.localtime).format('LLLL'),
                    location:data.location.name,
                }
                )
            })
    }
    handleClear = ()=>{
        this.setState({
            isError:false,
            autoSearch:{
                input:'',
                predictions:[],
                isPredicting:false
            }
        })
    }
    handleAlert = ()=>{
        this.setState({
            isError:false
        })
    }
    render(){
        return(
        <div className='border border-black container rounded mt-2  p-4 bg-dark text-white' > 
            <div className='row p-2'>
                <h4 className=''>Weather App</h4>
                <button className="btn btn-light w-10 ml-2 " onClick={this.currentLocation} >current location</button>
            </div> 
            <div className='row position-relative'>
                <input className="col-md-8 form-control mb-1" type="text" value={this.state.autoSearch.input} onChange={this.handleChange} placeholder="Enter Location"/>
                <div className='col-md-4 d-flex justify-content-around mb-1'>
                <input className="btn btn-success w-50 " type="button" value="Search" onClick={this.handleSubmit} />
                <input className="btn btn-success w-50 ml-1" type="button" value="Clear" onClick={this.handleClear} />
                {this.state.isError && <Alert clear={this.handleClear} click={this.handleAlert}/>}
                </div>
            </div>
            <div className=''>
                {this.state.autoSearch.isPredicting  &&  <Predictions  {...this.state.autoSearch} select={this.select}/>}
            </div>
            <div className='row mt-1 align-items-center' >
                <Current {...this.state.currentWeather} localtime={this.state.localtime} location={this.state.location}  />
                <div className='col-md-4 p-1' style={{'height':'200px'}} >
                    <GoogleMap address={this.state.search||'Adelaide'}/>
                </div>
                <div className='col-md-12 mt-3 alert-secondary border border-light rounded' >
                <div className='row'>
                <form action="" className='col-md-2 text-dark font-weight-bold' >
                    <label >Select future days</label>
                    <select  className='form-control form-control-sm' name="days" id="" onChange={this.handleSelect}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </form>
                <Forecast {...this.state.foreCastWeather} days={this.state.days} />
                </div>
            </div>
            </div>

            
        </div>
        )        
    }
}