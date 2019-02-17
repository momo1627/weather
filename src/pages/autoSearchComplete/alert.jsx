import React from 'react'
export default function Alert(props){
    const ok = ()=>{
        props.click()}
    const clear = ()=>{
        props.clear()
    }
    return(
        <div className='position-absolute border border-primary bg-danger border rounded border-danger p-3' style={{'z-index':'1001'}}>
            <div className='h4 text-center'>alert</div>
            <div className='h5'>type or select correct location name</div>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-warning ' onClick={ok}>ok</button>
                <button className='btn btn-warning' onClick={clear}>clear</button>
            </div>
        </div>
    )
}