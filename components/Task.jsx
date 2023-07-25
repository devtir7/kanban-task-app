import { nanoid } from "nanoid"
import todoIcon from "../assets/icon-todo.svg"

import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"
import { ModalContext } from "../contexts/ModalContext"

export default function Task(props) {
  const board = props.value
  const { openModal } = useContext(ModalContext)
  const { setSelectedColumnIndex, setSelectedTaskIndex } =
    useContext(TasksContext)

  function handleViewTask(columnIndex, taskIndex) {
    setSelectedColumnIndex(columnIndex)
    setSelectedTaskIndex(taskIndex)
    openModal("view-task-modal")
  }

  return (
    <div className="columns-row">
      {board.columns.map((column, colIndex) => {
        return (
          <div key={column.id} className="column">
            <img src={todoIcon} />
            <p className="heading-S">{column.name}</p>

            {column.tasks.map((task, taskIndex) => {
              const subTasksCount = task.subtasks.filter(
                subtask => subtask.isCompleted === true
              ).length
              return (
                <div
                  key={task.id}
                  className="task"
                  onClick={() => handleViewTask(colIndex, taskIndex)}>
                  <div className="heading-M">{task.title}</div>
                  <div className="body-M">
                    {subTasksCount} of {task.subtasks.length} subtasks
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// import todoIcon from "../assets/icon-todo.svg"

// export default function Task(props) {
//     const board = props.value

//     return (
//         <div className="columns-row">
//             {board.columns.map(column => {
//                 return (
//                 <div key={column.name} className="column">
//                     <img src={todoIcon} />
//                     <p className="heading-S">{column.name}</p>

//                     {column.tasks.map(task => {
//                         const subTasksCount = task.subtasks.filter(subtask => subtask.isCompleted === true).length
//                         return (
//                             <div key={task.id} className="task">
//                                 <div className="heading-M">{task.title}</div>
//                                 <div className="body-M">{subTasksCount} of {task.subtasks.length} subtasks</div>
//                             </div>
//                         )
//                     })}
//                 </div>)
//             })}
//         </div>
//     )
// }
