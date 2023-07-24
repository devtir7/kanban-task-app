import { nanoid } from "nanoid";
import todoIcon from "../assets/icon-todo.svg";

export default function Task(props) {
  const board = props.value;

  return (
    <div className="columns-row">
      {board.columns.map((column) => {
        const columnKey = nanoid(); // Generate a unique key for each column
        return (
          <div key={columnKey} className="column">
            <img src={todoIcon} />
            <p className="heading-S">{column.name}</p>

            {column.tasks.map((task) => {
              const taskKey = nanoid(); // Generate a unique key for each task
              const subTasksCount = task.subtasks.filter(
                (subtask) => subtask.isCompleted === true
              ).length;
              return (
                <div key={taskKey} className="task">
                  <div className="heading-M">{task.title}</div>
                  <div className="body-M">
                    {subTasksCount} of {task.subtasks.length} subtasks
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
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