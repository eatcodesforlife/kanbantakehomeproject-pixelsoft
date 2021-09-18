import React, { useState } from "react";
import InProgress from "./components/InProgress";
import NewTask from "./components/NewTask";
import Completed from "./components/Completed"

function App() {
  
  const [ newTask, setNewTask ] = useState('')
  const [ rate, setRate ]= useState('')
  const [ taskList, setTaskList ] = useState([])
  const [ taskInProgress, setTaskInProgress ] = useState([])
  const [ completedJobs, setCompletedJobs ] = useState([])
  
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
        <h2>To Do</h2>
        <NewTask  
          newTask={newTask}
          rate={rate}
          taskList={taskList}
          setNewTask={setNewTask}
          setRate={setRate}
          setTaskList={setTaskList}
          currentTask={currentTask}
        />
      </section>
      <section>
        <h2>In Progress</h2>
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
        <h2>Done</h2>
        <button className='main-btns' onClick={() => clear()}>clear</button>
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
