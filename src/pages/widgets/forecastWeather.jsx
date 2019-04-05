import React from 'react'
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
                <div className='col-8 col-sm-4 col-lg-2  col-xl-2 mx-auto m-1  small bg-white shadow text-dark border border-light rounded' key={item.date_epoch} style={{"min-height":"150px"}}>
                    <div className='p-1'>{item.date}</div >
                    <img src={item.day.condition.icon} alt=""/>
                    <div className='p-1 h4'>{item.day.avgtemp_c}&#8451;</div >
                    <div className='p-1'>{item.day.condition.text}</div >
                </div>
            )
        })
    }

    

    return(
        <div className='text-center col'>
            <div className='row p-2'>
                {element}
            </div>
        </div>
    )
}