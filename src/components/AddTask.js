import React, { useContext } from 'react'
import { AppContext } from '../App'
const AddTask = () => {

  const { 
    isAddTask,
    newTask, 
    setNewTask, 
    handleSubmit } = useContext(AppContext)

  return (
    <div className="section-header">
      <h2>To Do</h2>
      <form onSubmit={handleSubmit}>
        { isAddTask &&
          <div className="form-control">
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
            /> 
          </div> 
        }       
        { isAddTask ? <button type='submit' className='main-btns'>Add Task</button>
        :<button type='submit' className='main-btns'>New Task</button>}
      </form>
    </div>
  )
}

export default AddTask
