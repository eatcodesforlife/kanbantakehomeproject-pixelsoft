import React from 'react'
import { v4 as uuidv4 } from 'uuid'


const NewTask = ({ newTask, rate, taskList, setRate, setNewTask, setTaskList, currentTask}) => {

  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(newTask && rate){
      const task = {
        id: uuidv4(),
        newTask,
        rate
      }

      setTaskList([ ...taskList, task ])
      setRate('')
      setNewTask('')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="newTask">new task: </label>
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          /> <br />
          <label htmlFor="new task">rate/hr: </label>
          <input type="number" value={rate} 
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>        
        <button type='submit' className='main-btns'>Add Task</button>
      </form>
      <div className='task-list-container'>
        {
          taskList.map( ({id, newTask}) => {
           
           return <div key={id} className='items'>
              <h4>{newTask}</h4>
              <button onClick={()=>currentTask(id)}>Start task</button>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default NewTask
