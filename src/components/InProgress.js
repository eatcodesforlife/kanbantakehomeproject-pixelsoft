import React,{ useEffect, useState } from 'react'

const InProgress = ({ item, jobCompleted }) => {
  
  const [ secs, setSecs ] = useState(1)
  const [ timer, setTimer ] = useState({
    hour: 0,
    mins: 0,
    seconds: 0
  })

  const [isTaskRunning, setIsTaskRunning] = useState(true)
  const { id, newTask, rate } = item

  
  const resolve = (_id, hour, mins) =>{
    setIsTaskRunning(!isTaskRunning)
    jobCompleted(_id, hour, mins, rate)
  }

  

  useEffect(() =>{
    if(isTaskRunning){
        const timeCounter = setInterval(() => {
        setSecs( secs => secs + 1)

        const hours = Math.floor(secs / (60 * 60));

        const divisor_for_minutes = secs % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const seconds = Math.ceil(divisor_for_seconds);
        
        setTimer({
          hour: hours,
          mins: minutes,
          seconds
        })

          
      }, 1000)
      return () => clearInterval(timeCounter)
    }
  }, [secs, isTaskRunning])
  
  
  const { hour, mins, seconds } = timer

  return (
    <div className='tasks'>
      <h4>{newTask}</h4>
      <h4>{`${hour} : ${mins} : ${seconds}`}</h4>
      <button onClick={() => resolve(id, hour, mins, rate)}>resolve</button>
    </div>
  )
}

export default InProgress
