import { useContext } from "react"
import mobileLogo from "../assets/logo-mobile.svg"
import downArrow from "../assets/icon-chevron-down.svg"
import upArrow from "../assets/icon-chevron-up.svg"
import ellipsis from "../assets/icon-vertical-ellipsis.svg"
import addTaskMobile from "../assets/add-task-mobile.svg"

import { TasksContext } from "../contexts/TasksContext"

import { ModalContext } from "../contexts/ModalContext"

export default function Navbar() {
  const { boardsData, selectedBoardIndex } = useContext(TasksContext)

  const { modal, openModal, closeModal } = useContext(ModalContext)

  function handleModal(type) {
    if (modal.isOpen) {
      closeModal()
    } else {
      openModal(`${type}-board`)
    }
  }

  return (
    <nav>
      <img className="mobile-logo" src={mobileLogo} alt="kanban mobile logo" />
      <div className="board-name">
        <h1 onClick={() => handleModal("list")}>
          {boardsData[selectedBoardIndex]?.name}
        </h1>

        <img
          src={
            modal.isOpen && modal.type === "list-board" ? upArrow : downArrow
          }
          alt="arrow button to display all boards"
        />
      </div>
      <img
        className="add-task-mobile"
        src={addTaskMobile}
        alt="button to add new task"
        onClick={() => openModal("add-task-modal")}
      />
      <img
        className="ellipsis"
        src={ellipsis}
        alt="vertical ellipsis"
        onClick={() => handleModal("options")}
      />
    </nav>
  )
}
