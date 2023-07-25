import { useState, useContext } from "react"
import delColumnIcon from "../../assets/delete-column.svg"
import Modal from "react-overlays/Modal"

import { nanoid } from "nanoid"

import { TasksContext } from "../../contexts/TasksContext"
import { ModalContext } from "../../contexts/ModalContext"

export default function AddBoardModal() {
  const { addBoard } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const renderBackdrop = props => <div className="backdrop" {...props} />

  const [formData, setFormData] = useState({
    name: "",
    columns: ["Todo", "Doing"],
  })

  function handleChange(e) {
    console.log(e.target.value)
    const { name, value } = e.target
    console.log(name)

    if (name === "columns") {
      // If the change is in the columns array (adding/removing columns)
      const updatedColumns = formData.columns.slice() // Create a copy of the columns array

      // If the input field value is empty, remove the column
      if (value === "") {
        const columnIndex = parseInt(e.target.dataset.index, 10) // Get the index of the column
        updatedColumns.splice(columnIndex, 1) // Remove the column from the array

        setFormData(prev => {
          return {
            ...prev,
            columns: updatedColumns, // Update the columns in the formData
          }
        })
      } else {
        // If the input field has a value, update the column
        const columnIndex = parseInt(e.target.dataset.index, 10)
        updatedColumns[columnIndex] = value // Update the column in the array

        setFormData(prev => {
          return {
            ...prev,
            columns: updatedColumns, // Update the columns in the formData
          }
        })
      }
    } else if (name === "name") {
      // If the change is for other fields (e.g., board name)
      console.log("Input value:", value)
      setFormData(prev => {
        return {
          ...prev,
          [name]: value,
        }
      })
      console.log("formData.name:", formData.name)
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

    setFormData(prev => {
      return {
        ...prev,
        columns: [...prev.columns, ""],
      }
    })
  }

  function handleSubmit(e) {
    const newBoard = {
      name: formData.name,
      columns: formData.columns.map(columnName => ({
        name: columnName,
        tasks: [],
      })),
      id: nanoid(),
    }

    addBoard(newBoard)
    closeModal()
  }

  return (
    <Modal
      className="modal modal-add-board"
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
                      defaultValue={column}
                      placeholder={column}
                      onChange={handleChange}
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
            <button className="button-primary-S">Create New Board</button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
