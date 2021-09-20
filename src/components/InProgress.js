import React,{ useEffect, useState, useContext } from 'react'
import numeral from 'numeral'
import { AppContext } from '../App'



const InProgress = ({ item }) => {
  const { jobCompleted } = useContext(AppContext)
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

        
        const divisor_for_minutes = secs % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60);
        
        const divisor_for_seconds = divisor_for_minutes % 60;
        const seconds = Math.ceil(divisor_for_seconds);
        
        const hours = Math.floor(secs / (60 * 60));
        
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
      <h4>{`${numeral(hour).format('00')} : ${numeral(mins).format('00')} : ${numeral(seconds).format('00')}`}</h4>
      <button onClick={() => resolve(id, hour, mins, rate)}>resolve</button>
    </div>
  )
}

export default InProgress
