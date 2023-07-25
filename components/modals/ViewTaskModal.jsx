import { useState, useEffect, useContext } from "react"
import Modal from "react-overlays/Modal"
import { ModalContext } from "../../contexts/ModalContext"
import { TasksContext } from "../../contexts/TasksContext"
import ellipsis from "../../assets/icon-vertical-ellipsis.svg"

export default function ViewTaskModal() {
  const renderBackdrop = props => <div className="backdrop" {...props} />

  const { modal, openModal, closeModal } = useContext(ModalContext)
  const {
    boardsData,
    selectedBoardIndex,
    selectedColumnIndex,
    selectedTaskIndex,
    updateTaskStatus,
    updateSubtaskStatus,
  } = useContext(TasksContext)

  const selectedTask =
    boardsData[selectedBoardIndex].columns[selectedColumnIndex].tasks[
      selectedTaskIndex
    ]

  // const selectedTask = boardsData[selectedBoardIndex].columns.reduce(
  //   (acc, column) => acc.concat(column.tasks),
  //   []
  // )[selectedTaskIndex]

  const subTasksCount = selectedTask.subtasks.filter(
    subtask => subtask.isCompleted === true
  ).length

  const [currentStatus, setCurrentStatus] = useState(selectedTask.status)
  const [statusChanged, setStatusChanged] = useState(false)

  function handleChange(e) {
    const { name, value, checked } = e.target

    if (name === "status") {
      setCurrentStatus(value)
      setStatusChanged(true)
    } else if (name === "isCompleted") {
      const subtaskIndex = Number(e.target.dataset.index)

      // Call the updateSubtaskStatus function from the context
      updateSubtaskStatus(
        selectedBoardIndex,
        selectedTaskIndex,
        selectedColumnIndex,
        subtaskIndex,
        checked
      )
    }
  }

  function handleClose() {
    if (statusChanged) {
      updateTaskStatus(selectedBoardIndex, selectedTaskIndex, currentStatus)
    }
    setStatusChanged(false)
    closeModal()
  }

  return (
    <Modal
      className="modal"
      show={modal.isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className="task-details">
        <section className="header">
          <h1 className="heading-L">{selectedTask.title} </h1>
          <img
            src={ellipsis}
            className="task-options"
            onClick={() => openModal("options-task-modal")}
          />
        </section>
        <p className="body-L">{selectedTask.description} </p>

        <p className="subtasks-progress">
          Subtasks ({subTasksCount} of {selectedTask.subtasks.length})
        </p>

        <form>
          {selectedTask.subtasks.map((subtask, index) => {
            return (
              <div key={index}>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id={`subtask-${index}`}
                    checked={subtask.isCompleted}
                    onChange={handleChange}
                    name="isCompleted"
                    data-index={index}
                  />
                  <label htmlFor={`subtask-${index}`}>
                    <div key={subtask.title} className="subtask">
                      {subtask.title}
                    </div>
                  </label>
                </div>
              </div>
            )
          })}

          <label className="current-status">
            Current Status
            <select
              className="status-dropdown"
              name="status"
              value={currentStatus}
              onChange={handleChange}>
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </form>
      </div>
    </Modal>
  )
}
