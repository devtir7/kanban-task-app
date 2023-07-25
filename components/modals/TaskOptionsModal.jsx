import { useContext } from "react"
import Modal from "react-overlays/Modal"

import { ModalContext } from "../../contexts/ModalContext"

export default function TaskOptionsModal() {
  const { modal, openModal, closeModal } = useContext(ModalContext)
  const renderBackdrop = props => <div className="backdrop-edit" {...props} />
  function handleSelection(selection) {
    closeModal()

    if (selection === "edit") {
      openModal("edit-task-modal")
    } else if (selection === "delete") {
      openModal("delete-task-modal")
    }
  }

  return (
    <Modal
      className="modal modify-board"
      show={modal.isOpen}
      onHide={closeModal}
      renderBackdrop={renderBackdrop}>
      <div>
        <p className="body-L" onClick={() => handleSelection("edit")}>
          Edit task
        </p>
        <p className="body-L delete" onClick={() => handleSelection("delete")}>
          Delete task
        </p>
      </div>
    </Modal>
  )
}
