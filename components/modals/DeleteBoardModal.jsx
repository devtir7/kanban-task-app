import { useContext } from 'react'
import Modal from "react-overlays/Modal"

import { TasksContext } from '../../contexts/TasksContext'
import { ModalContext } from '../../contexts/ModalContext'

export default function DeleteBoardModal() {
  
  const { boardsData, selectedBoardIndex, deleteBoard } = useContext(TasksContext)
  const { modal, closeModal } = useContext(ModalContext)

  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  function handleDelete() {
    deleteBoard(selectedBoardIndex)
    closeModal()
  }

  return (
                <Modal
                  className="modal warning-delete"
                  show={modal.isOpen}
                  onHide={closeModal}
                  renderBackdrop={renderBackdrop}
                >
                  <div className='warning-delete'>
                    <h1 className="heading-L">Delete this board?</h1>
                    <p className="body-L">Are you sure you want to delete the {boardsData[selectedBoardIndex].name} board? This action will remove all columns and tasks and cannot be reversed.</p>
                    <div className="delete-button-container">
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                 </div></div>
              </Modal>
  )
}

