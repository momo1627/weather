import React from 'react'
export default function Prediction(props){
    const predictions = props.predictions;
    const select = props.select;
    const elements = (predictions||[]).map(item=>{
        return (
            <button className='list-group-item list-group-item-action bg-warning ' key={item.id} onClick={()=>{select(item)}}>
                {item.name}
            </button>
        )
    })
    return (
        <div className='position-absolute list-group t-2' style={{'z-index':'1000'}}>
            {elements}
        </div>
        
        )
        
}
