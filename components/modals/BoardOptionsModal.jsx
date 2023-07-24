import {useContext} from "react"
import Modal from "react-overlays/Modal"

import { ModalContext } from '../../contexts/ModalContext'

export default function BoardOptionsModal() {

  const { modal, openModal, closeModal } = useContext(ModalContext)

  function handleSelection(selection) {
    closeModal()

    if (selection === "edit") {
      openModal("edit-board")
    }

    else if (selection === "delete") {
      openModal("delete-board")
    }
  }
  
        return (
          <Modal
            className="modal modify-board"
            show={modal.isOpen}
            onHide={closeModal}
          >
            <div>
              <p className="body-L" onClick={() => handleSelection("edit")}>Edit board</p>
              <p className="body-L delete" onClick={() => handleSelection("delete")}>Delete board</p>
            </div>
          </Modal>
        )
      }