import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"
import { ModalContext } from "../contexts/ModalContext"
import todoIcon from "../assets/icon-todo.svg"

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

  return !(board.columns.length === 0) ? (
    <div className="columns-row" key={1 + Math.random()}>
      {board.columns.map((column, colIndex) => {
        return (
          <div key={column.id} className="column">
            <img src={todoIcon} />
            <p className="column-name heading-S">
              {column.name?.toUpperCase()}
            </p>

            {column.tasks.map((task, taskIndex) => {
              const subTasksCount = task.subtasks.filter(
                subtask => subtask.isCompleted === true
              ).length
              return (
                <div
                  key={task.id}
                  className="task"
                  onClick={() => handleViewTask(colIndex, taskIndex)}>
                  <div className="task-title heading-M">{task.title}</div>
                  <div className="task-body body-M">
                    {subTasksCount} of {task.subtasks.length} subtasks
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
      <div
        className="add-column-bar heading-XL"
        onClick={() => openModal("edit-board")}>
        + New Column
      </div>
    </div>
  ) : (
    <div className="boards-empty">
      <p className="heading-L">
        This board is empty. Create a new column to get started.
      </p>
      <button
        className="button-primary-L"
        onClick={() => openModal("edit-board")}>
        + Add New Column
      </button>
    </div>
  )
}
