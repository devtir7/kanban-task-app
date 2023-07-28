import { useState, useEffect, useContext } from "react"
import delColumnIcon from "../../assets/delete-column.svg"
import Modal from "react-overlays/Modal"

import { TasksContext } from "../../contexts/TasksContext"
import { ModalContext } from "../../contexts/ModalContext"

export default function EditTaskModal({ theme }) {
  const {
    boardsData,
    selectedBoardIndex,
    editTask,
    selectedColumnIndex,
    selectedTaskIndex,
  } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const renderBackdrop = props => <div className="backdrop" {...props} />

  const [taskData, setTaskData] = useState(
    boardsData[selectedBoardIndex].columns[selectedColumnIndex].tasks[
      selectedTaskIndex
    ]
  )
  useEffect(() => console.log(taskData.status), [taskData])
  function handleChange(e) {
    const { name, value } = e.target

    if (name === "subtasks") {
      // Get the index of the subtask being updated from the data-index attribute
      const subtaskIndex = Number(e.target.dataset.index)
      // Create a new array of subtasks with the updated value
      const updatedSubtasks = taskData.subtasks.map((subtask, index) =>
        index === subtaskIndex ? { ...subtask, title: value } : subtask
      )

      setTaskData(prev => ({
        ...prev,
        subtasks: updatedSubtasks,
      }))
    } else {
      setTaskData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  function deleteSubtask(index) {
    // Function to handle the click on the "X" button to remove the subtask
    const updatedSubtasks = taskData.subtasks.slice() // Create a copy of the subtasks array
    updatedSubtasks.splice(index, 1) // Remove the subtask from the array

    setTaskData(prev => {
      return {
        ...prev,
        subtasks: updatedSubtasks, // Update the subtasks in the taskData
      }
    })
  }

  function addSubtask(e) {
    e.preventDefault()

    setTaskData(prev => {
      return {
        ...prev,
        subtasks: [
          ...prev.subtasks,
          {
            title: "",
            isCompleted: false,
          },
        ],
      }
    })
  }

  function handleSubmit(e) {
    const updatedTask = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      subtasks: taskData.subtasks,
      id: taskData.id,
    }

    editTask(
      updatedTask,
      selectedBoardIndex,
      selectedColumnIndex,
      selectedTaskIndex
    )
    closeModal()
  }

  return (
    <Modal
      className={`modal modal-add-board ${theme}`}
      show={modal.isOpen}
      onHide={closeModal}
      renderBackdrop={renderBackdrop}>
      <div className="modal-content">
        <div className="add-content">
          <h1 className="heading-L">Edit Task</h1>

          <form className="add-board-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                className="form-text-input body-L"
                type="text"
                name="title"
                value={taskData.title}
                placeholder="e.g. Take coffee break"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                className="form-text-input body-L task-description"
                type="text"
                name="description"
                defaultValue={taskData.description}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                onChange={handleChange}
              />
            </label>

            <div className="add-columns">
              <p>Subtasks</p>

              {taskData?.subtasks.map((subtask, index) => {
                return (
                  <div key={index} className="col">
                    <input
                      className="column-input body-L"
                      type="text"
                      name="subtasks"
                      value={taskData.subtasks[index].title}
                      data-index={index}
                      onChange={handleChange}
                    />
                    <img
                      className="column-delete"
                      src={delColumnIcon}
                      onClick={() => deleteSubtask(index)}
                    />
                  </div>
                )
              })}

              <button className="button-secondary" onClick={addSubtask}>
                + Add New Subtask
              </button>

              <label className="subscript-text">
                Status
                <select
                  className="form-text-input body-L"
                  name="status"
                  defaultValue={taskData.status}
                  onChange={handleChange}
                  required>
                  {boardsData[selectedBoardIndex].columns.map(column => {
                    return (
                      <option value={column.name.toString()}>
                        {column.name}
                      </option>
                    )
                  })}
                </select>
              </label>
            </div>
            <button className="button-primary-S">Save Changes</button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
