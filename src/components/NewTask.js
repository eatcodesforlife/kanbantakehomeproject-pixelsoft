import React from 'react'


const NewTask = ({taskList, currentTask}) => {

  

  return (
    <div>
      {
        taskList.map( ({id, newTask}) => {
          
          return <div key={id} className='tasks'>
            <h4>{newTask}</h4>
            <button onClick={()=>currentTask(id)}>Start</button>
          </div>
        })
      }
    </div>
  )
}

export default NewTask
