import { useContext } from "react"
import Modal from "react-overlays/Modal"

import boardIcon from "../../assets/icon-board.svg"

import ToggleSwitch from "../ToggleSwitch"

import { TasksContext } from "../../contexts/TasksContext"

import { ModalContext } from "../../contexts/ModalContext"

export default function BoardListModal({ theme }) {
  const { boardsData, setSelectedBoardIndex } = useContext(TasksContext)

  const { modal, openModal, closeModal } = useContext(ModalContext)

  const renderBackdrop = props => <div className="backdrop" {...props} />

  const boardsEl = boardsData?.map((board, index) => {
    return (
      <div key={board.id} className="modal-list-board-item">
        <img src={boardIcon} />
        <p className="heading-M" onClick={() => setSelectedBoardIndex(index)}>
          {board.name}
        </p>
        <br />
      </div>
    )
  })

  function handleCreateBoard() {
    closeModal()
    openModal("add-board")
  }

  return (
    <Modal
      className={`modal ${theme}`}
      show={modal?.isOpen}
      onHide={closeModal}
      renderBackdrop={renderBackdrop}>
      <div>
        <div className="modal-list-header">
          <div className="modal-list-title">
            ALL BOARDS ({boardsData?.length})
          </div>
        </div>

        <div className="modal-list-boards">
          {boardsEl}

          <div className="modal-list-board-item mobile-add">
            <img src={boardIcon} />
            <p onClick={handleCreateBoard}>+ Create new Board</p>
          </div>
        </div>

        <div className="modal-list-footer">
          <ToggleSwitch />
        </div>
      </div>
    </Modal>
  )
}
