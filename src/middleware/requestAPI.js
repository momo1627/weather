import API from './constrains'
function requestCurrentWeahter(location){
    fetch(`https://api.apixu.com/v1/current.json?key=${API}&q=${location}`,{method:"GET"}).then(
        (data)=>{return data.text()}
    ).then(
        (data)=>{
            this.setState({predictions:data})
        }
    )
    return 
}
function requestForeCastWeather(location){
    return `https://api.apixu.com/v1/forecast.json?key=${API}&q=${location}`
}
function requestAutoSearch(location){
    
}
export {requestCurrentWeahter,requestForeCastWeather,requestAutoSearch}