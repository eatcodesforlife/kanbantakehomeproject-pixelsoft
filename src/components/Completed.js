import React, { useState, useEffect } from 'react'

const Completed = ({ newTask, hour, mins, rate }) => {
  
  
  const [ total, setTotal ] = useState(0)
    
  useEffect(()=>{
    const totalBillHrs = hour * rate
    const totalBillMins = (rate/60) * mins
    setTotal( totalBillHrs + totalBillMins)
  },[hour, rate, mins])
  
  return (
    <div className='tasks'>
      <h4>{newTask}</h4>
      <h4>${total.toFixed(2)}</h4>
    </div>
  )
}

export default Completed
