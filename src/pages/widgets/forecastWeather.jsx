import React from 'react'
import moment from 'moment'
export default function Forecast(props){
    const days = props.days
    let data = props.forecastday || [{
        date_epoch:1,
        date:'date',
        day:{
            avgtemp_c:'',
            condition:{
                text:'condition',
                icon:''
        }
        }
        }]
    data = data.slice(0,days)
    let element;
    if (data){
        element = data.map((item)=>{
            return(
                <div  className='col-8 col-sm-4 col-md-3 col-lg-2  col-xl-2 mx-auto  small bg-light text-dark border border-secondary rounded' key={item.date_epoch}>
                    <div className='p-1'>{item.date}</div >
                    <img src={item.day.condition.icon} alt=""/>
                    <div className='p-1 h4'>{item.day.avgtemp_c}&#8451;</div >
                    <div className='p-1'>{item.day.condition.text}</div >
                </div>
            )
        })
    }

    

    return(
        <div className='text-center col p-2'>
            <div className='row'>
            {element}
            </div>
        </div>
    )
}