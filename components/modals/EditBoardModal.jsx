import { useContext } from "react"
import { useState, useEffect } from "react"
import Modal from "react-overlays/Modal"

import { TasksContext } from "../../contexts/TasksContext"
import { ModalContext } from "../../contexts/ModalContext"

import delColumnIcon from "../../assets/delete-column.svg"

export default function EditBoardModal() {
  const { boardsData, selectedBoardIndex, editBoard } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const renderBackdrop = props => <div className="backdrop" {...props} />

  const [formData, setFormData] = useState(boardsData[selectedBoardIndex])

  function handleChange(e) {
    const { name, value } = e.target

    if (name.startsWith("columns")) {
      const columnIndex = parseInt(e.target.dataset.index, 10)
      const updatedColumns = formData.columns.map((col, index) =>
        index === columnIndex ? { ...col, name: value } : col
      )

      setFormData(prev => {
        return {
          ...prev,
          columns: updatedColumns,
        }
      })
    } else if (name === "name") {
      setFormData(prev => {
        return {
          ...prev,
          [name]: value,
        }
      })
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
        columns: [...prev.columns, { name: "", tasks: [] }],
      }
    })
  }

  useEffect(() => console.log(boardsData), [boardsData])

  function handleSubmit(e) {
    e.preventDefault()

    const updatedBoard = {
      ...formData,
      columns: formData.columns.map(col => ({
        ...col,
        tasks: col.tasks.map(task => ({ ...task })), // Clone tasks to avoid mutating original data
      })),
    }

    editBoard(updatedBoard, selectedBoardIndex)
    closeModal()
  }

  return (
    <Modal
      className="modal modal-edit-board"
      show={modal.isOpen}
      onHide={closeModal}
      renderBackdrop={renderBackdrop}>
      <div className="modal-content">
        <div className="add-content">
          <h1 className="heading-L">Edit Board</h1>

          <form className="add-board-form" onSubmit={handleSubmit}>
            <label>
              Board Name
              <input
                className="form-text-input body-L"
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={handleChange}
              />
            </label>

            <div className="add-columns">
              <p>Board Columns</p>

              {formData?.columns.map((column, index) => {
                return (
                  <div key={index} className="col">
                    <input
                      className="column-input body-L"
                      type="text"
                      name={`columns-${index}`} // Use a unique name for each input field
                      value={column.name} // Use value prop instead of defaultValue
                      onChange={handleChange} // Use onChange prop
                      data-index={index}
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

            <button className="button-primary-S">Save Changes</button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
