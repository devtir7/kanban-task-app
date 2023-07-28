import { useState, useContext } from "react"
import delColumnIcon from "../../assets/delete-column.svg"
import Modal from "react-overlays/Modal"

import { nanoid } from "nanoid"

import { TasksContext } from "../../contexts/TasksContext"
import { ModalContext } from "../../contexts/ModalContext"

export default function AddTaskModal({ theme }) {
  const { boardsData, selectedBoardIndex, addTask } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const renderBackdrop = props => <div className="backdrop" {...props} />

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    subtasks: [],
  })

  function handleChange(e) {
    const { name, value } = e.target

    if (name === "subtasks") {
      // Get the index of the subtask being updated from the data-index attribute
      const subtaskIndex = Number(e.target.dataset.index)
      // Create a new array of subtasks with the updated value
      const updatedSubtasks = formData.subtasks.map((subtask, index) =>
        index === subtaskIndex ? { ...subtask, title: value } : subtask
      )

      setFormData(prev => ({
        ...prev,
        subtasks: updatedSubtasks,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value === "" ? "todo" : value,
      }))
    }
  }

  function deleteSubtask(index) {
    // Function to handle the click on the "X" button to remove the subtask
    const updatedSubtasks = formData.subtasks.slice() // Create a copy of the subtasks array
    updatedSubtasks.splice(index, 1) // Remove the subtask from the array

    setFormData(prev => {
      return {
        ...prev,
        subtasks: updatedSubtasks, // Update the subtasks in the formData
      }
    })
  }

  function addSubtask(e) {
    e.preventDefault()

    setFormData(prev => {
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
    const newTask = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      subtasks: formData.subtasks.map(subtask => ({
        ...subtask,
        isCompleted: false,
      })),
      id: nanoid(),
    }

    addTask(newTask, selectedBoardIndex)
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
          <h1 className="heading-L">Add New Task</h1>

          <form className="add-board-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                className="form-text-input body-L"
                type="text"
                name="title"
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
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                onChange={handleChange}
              />
            </label>

            <div className="add-columns">
              <p>Subtasks</p>
              {formData?.subtasks.map((subtask, index) => {
                return (
                  <div key={index} className="col">
                    <input
                      className="column-input body-L"
                      type="text"
                      name="subtasks"
                      value={formData.subtasks[index].title}
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
              <label className="subscript-text" forhtml="status">
                Status
              </label>
              <select
                id="status"
                className="form-text-input body-L"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required>
                <option disabled value="">
                  Choose status
                </option>
                {boardsData[selectedBoardIndex].columns.map(column => {
                  return (
                    <option value={column.name.toString()}>
                      {column.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="button-primary-S">Create Task</button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
