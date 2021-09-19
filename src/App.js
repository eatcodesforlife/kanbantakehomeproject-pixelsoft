import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'

import InProgress from "./components/InProgress";
import NewTask from "./components/NewTask";
import Completed from "./components/Completed"


function App() {
  
  const [ newTask, setNewTask ] = useState('')
  const [ taskList, setTaskList ] = useState([])
  const [ taskInProgress, setTaskInProgress ] = useState([])
  const [ completedJobs, setCompletedJobs ] = useState([])
  const [ isAddTask, setIsAddTask ] = useState(false)
  
  const rate = 25

  const handleSubmit = (e) =>{
    e.preventDefault()
    setIsAddTask(!isAddTask)
    if(newTask){      
      const task = {
        id: uuidv4(),
        newTask,
        rate
      }

      setTaskList([ ...taskList, task ])
      setNewTask('')
      setIsAddTask(!isAddTask)
    }
  }
  

  const currentTask = (_id) => {
    setTaskList( taskList.filter( item => item.id !== _id))
    setTaskInProgress( [...taskInProgress, taskList.filter( item => item.id === _id)].flat() )
  }

  const jobCompleted = (_id, hour, mins ) =>{
    setTaskInProgress( taskInProgress.filter( item => _id !== item.id))
    const completedTask = taskInProgress.filter( task => task.id === _id)
                          .map(({id, newTask, rate}) => {
                            return{
                              id,
                              newTask,
                              rate,
                              hour,
                              mins
                            }
                          })
    
    setCompletedJobs([...completedJobs, completedTask].flat())                 

    
  }

  const clear = () => {
    setCompletedJobs([])
  }


  return (
    <div className="App">
      <section>
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
        <NewTask  
          newTask={newTask}
          rate={rate}
          taskList={taskList}
          setNewTask={setNewTask}
          setTaskList={setTaskList}
          currentTask={currentTask}
        />
      </section>
      <section>
        <div className="section-header">
          <h2>In Progress</h2>
        </div>
        
        {
          taskInProgress.map((item)=>(
            <InProgress 
              key={item.id}
              item={item}
              jobCompleted={jobCompleted}
            />
          ))
        }
      </section>
      <section>
        <div className="section-header">
          <h2>Done</h2>
          <button className='main-btns' onClick={() => clear()}>clear</button>
        </div>
        {
          completedJobs.map((items) => {

            return <Completed 
              key={items.id}
              {...items}
            />
          })
        }
      </section>
    </div>
  );
}

export default App;
