import React,{ useEffect, useState } from 'react'

const InProgress = ({ item, jobCompleted }) => {
  
  const [ hour, setHour ] = useState(0)
  const [ mins, setMins ] = useState(0)
  const [ secs, setSecs ] = useState(0)
  const [isTaskRunning, setIsTaskRunning] = useState(true)
  const { id, newTask, rate } = item

  
  const resolve = (_id, hour, mins) =>{
    setIsTaskRunning(!isTaskRunning)
    jobCompleted(_id, hour, mins, rate)
  }

  

  useEffect(() =>{
    if(isTaskRunning){
        const timer = setInterval(() => {
         setSecs( secs => secs + 1)
         if(secs === 59 ){
           setMins(mins +1)
           setSecs(0)
         }
         if(mins === 59){
           setHour(hour +1)
           setSecs(0)
         }
          
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [secs, isTaskRunning, mins, hour])

  

  return (
    <div className='items'>
      <h4>{newTask}</h4>
      <h4>{`${hour} : ${mins} : ${secs}`}</h4>
      <button onClick={() => resolve(id, hour, mins, rate)}>resolve</button>
    </div>
  )
}

export default InProgress
