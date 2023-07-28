import { useState, useContext } from "react"
import delColumnIcon from "../../assets/delete-column.svg"
import Modal from "react-overlays/Modal"

import { nanoid } from "nanoid"

import { TasksContext } from "../../contexts/TasksContext"
import { ModalContext } from "../../contexts/ModalContext"

export default function AddBoardModal({ theme }) {
  const { addBoard } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const renderBackdrop = props => <div className="backdrop" {...props} />

  const [formData, setFormData] = useState({
    name: "",
    columns: [
      {
        name: "Todo",
        tasks: [
          {
            title: "",
            description: "",
            status: "",
            subtasks: [],
          },
        ],
      },
      {
        name: "Doing",
        tasks: [
          {
            title: "",
            description: "",
            status: "",
            subtasks: [],
          },
        ],
      },
    ],
  })

  function handleChange(e, columnIndex) {
    const { name, value } = e.target

    if (name === "columns") {
      const updatedColumns = formData.columns.slice() // Create a copy of the columns array

      // Update the name property of the specific column
      updatedColumns[columnIndex].name = value

      setFormData(prev => ({
        ...prev,
        columns: updatedColumns,
      }))
    } else if (name === "name") {
      // If the change is for other fields (e.g., board name)
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  function deleteColumn(index) {
    // Function to handle the click on the "X" button to remove the column
    const updatedColumns = formData.columns.slice() // Create a copy of the columns array
    updatedColumns.splice(index, 1) // Remove the column from the array

    setFormData(prev => {
      return {
        ...prev,
        columns: updatedColumns, // Update the columns in the formData
      }
    })
  }

  function addColumn(e) {
    e.preventDefault()

    setFormData(prev => ({
      ...prev,
      columns: [...prev.columns, { name: "", tasks: [] }],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData.columns)
    const newBoard = {
      name: formData.name,
      columns: formData.columns.map(column => ({
        name: column.name,
        tasks: [],
      })),
      id: nanoid(),
    }

    addBoard(newBoard)
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
          <h1 className="heading-L">Add New Board</h1>

          <form className="add-board-form" onSubmit={handleSubmit}>
            <label>
              Board Name
              <input
                className="form-text-input body-L"
                type="text"
                name="name"
                placeholder="e.g. Web Design"
                onChange={handleChange}
                required
              />
            </label>

            <div className="add-columns">
              <p>Board Columns</p>

              {formData.columns.map((column, index) => {
                return (
                  <div key={index} className="col">
                    <input
                      className="column-input body-L"
                      type="text"
                      name="columns"
                      value={formData.columns[index].name}
                      onChange={e => handleChange(e, index)}
                    />
                    <img
                      className="column-delete"
                      src={delColumnIcon}
                      onClick={() => deleteColumn(index)}
                    />
                  </div>
                )
              })}

              <button className="button-secondary" onClick={addColumn}>
                + Add New Column
              </button>
            </div>
            <button type="submit" className="button-primary-S">
              Create New Board
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
