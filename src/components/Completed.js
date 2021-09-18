import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format';

const Completed = ({ newTask, hour, mins, rate }) => {
  
  
  const [ total, setTotal ] = useState(0)
  

  
  useEffect(()=>{
    const totalBillHrs = hour * rate
    const totalBillMins = (rate/60) * mins
    setTotal( totalBillHrs + totalBillMins)
  },[hour, rate, mins])
  
  return (
    <div className='items'>
      <h4>{newTask}</h4>
      <NumberFormat 
        value={total}
        prefix="$"
        decimalSeparator="."
        displayType="input"
        type="text"
        thousandSeparator={true}
        decimalScale={2}
      />
    </div>
  )
}

export default Completed
