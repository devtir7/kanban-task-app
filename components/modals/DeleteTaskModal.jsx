import { useContext } from "react"
import Modal from "react-overlays/Modal"

import { TasksContext } from "../../contexts/TasksContext"
import { ModalContext } from "../../contexts/ModalContext"

export default function DeleteTaskModal() {
  const {
    boardsData,
    selectedBoardIndex,
    selectedColumnIndex,
    selectedTaskIndex,
    deleteTask,
  } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const selectedTask =
    boardsData[selectedBoardIndex].columns[selectedColumnIndex].tasks[
      selectedTaskIndex
    ]

  const renderBackdrop = props => <div className="backdrop" {...props} />

  function handleDelete() {
    deleteTask(selectedBoardIndex, selectedColumnIndex, selectedTaskIndex)
    closeModal()
  }

  return (
    <Modal
      className="modal warning-delete"
      show={modal.isOpen}
      onHide={closeModal}
      renderBackdrop={renderBackdrop}>
      <div className="warning-delete">
        <h1 className="heading-L">Delete this task?</h1>
        <p className="body-L">
          Are you sure you want to delete the '{selectedTask.title}' task and
          its subtasks? This action cannot be reversed.
        </p>
        <div className="delete-button-container">
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}
