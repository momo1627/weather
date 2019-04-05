import React from 'react'
export default function Current(props){
    const condition = props.condition || {
        text:'condition',
        icon:''
    }
    const localtime = props.localtime || 'date'
    const location = props.location 
    const temp = props.temp_c || ''
    const humidity = props.humidity || ''
    const wind = props.wind_mph
    return(
                <div className='alert-secondary border border-light text-dark font-weight-bold rounded col-md-8 p-3' style={{"min-height":"200px"}}>
                <div className="text-center">{location}</div>
                <div className='text-center '>{localtime}</div>
                <div className='row h-100 align-items-center text-center'>
                <div className='col-md '>
                <div className='h2'>{temp}&#8451;</div>
                <div className='row'>
                    <div className='col'>
                    <div>Humidity</div>   
                    <div>{humidity}%</div> 
                        </div>
                    <div className='col'>
                    <div>Wind</div>    
                    <div>{wind}K/M</div>
                        </div>
                </div>
                </div>
                <div className='col-md  '>
                <img src={condition.icon} alt=""/>
                <div className=''>{condition.text}</div>
                </div>
               </div>
            </div>
                    
    )
}