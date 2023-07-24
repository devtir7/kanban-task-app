import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import ModalComponent from "react-overlays/Modal"

import { TasksContext } from '../contexts/TasksContext'

export default function ModifyModal({action, show, setShowModal, renderBackdrop}) {

  const { boardsData, addBoard, editBoard, deleteBoard, selectedBoardIndex } = useContext(TasksContext)

  const [formData, setFormData] = useState()

  function handleChange() {}

  function handleSubmit() {}
   function addColumn(e) {
      e.preventDefault()

      setFormData(prev => {
        return {
          ...prev,
          columns: [...prev.columns, ""]
        }
      })
    }

  if (action === "delete") {
    return (
      createPortal(
                <ModalComponent
                  className="modal"
                  show={show}
                  onHide={() => setShowModal(false)}
                  renderBackdrop={renderBackdrop}
                >
                 <h1 className="heading-L">Delete this board?</h1>
                 <p className="body-L">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                 {/* <button onClick={deleteBoard(selectedBoardIndex)}>Delete</button> */}
                 <button onClick={() => setShowModal(false)}>Cancel</button>
              </ModalComponent>, document.body
              )
  )}

  else {
    return (
      createPortal(
                  <ModalComponent
                    className="modal modal-add-board"
                    show={show}
                    onHide={() => {handleClose();setShowModal(false)}}
                    renderBackdrop={renderBackdrop}
                  >
                    <div className="add-content">
                      <h1 className="heading-L">Edit Board</h1>
                      
                      <form className="add-board-form" onSubmit={handleSubmit}>
                        <label>Board Name
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
                          
                          {formData?.columns.map((column, index) => {
                            return <div key={index} className="col">
                              <input
                                className="column-input body-L"
                                type="text"
                                name="columns"
                                defaultValue={column}
                                placeholder={column}
                                onChange={handleChange}
                              />
                              
                          <img className="column-delete" src={delColumnIcon} onClick={() => deleteColumn(index)}/>
                          
                        </div>
                      })}

                        <button className="button-secondary" onClick={addColumn}>+ Add New Column</button>
                      </div>
                      
                      <button className="button-primary-S">Save Changes</button>
                      
                        </form>
                        </div>
                    </ModalComponent>,document.body)
    )
  }
}