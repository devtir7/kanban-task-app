import { useContext } from "react"
import mobileLogo from "../assets/logo-mobile.svg"
import logoLight from "../assets/logo-light.svg"
import logoDark from "../assets/logo-dark.svg"
import downArrow from "../assets/icon-chevron-down.svg"
import upArrow from "../assets/icon-chevron-up.svg"
import ellipsis from "../assets/icon-vertical-ellipsis.svg"

import { TasksContext } from "../contexts/TasksContext"

import { ModalContext } from "../contexts/ModalContext"

export default function Navbar({ theme }) {
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
      <div className="kanban-logo">
        <img
          className="main-logo"
          src={theme === "light" ? logoDark : logoLight}
          alt="kanban logo"
        />
      </div>

      <img className="mobile-logo" src={mobileLogo} alt="kanban mobile logo" />
      <div className="board-name">
        <h1 className="heading-L" onClick={() => handleModal("list")}>
          {boardsData[selectedBoardIndex]?.name}
        </h1>

        <img
          className="board-arrow"
          src={
            modal.isOpen && modal.type === "list-board" ? upArrow : downArrow
          }
          alt="arrow button to display all boards"
        />
      </div>

      <button
        className={`add-task-mobile ${
          boardsData[selectedBoardIndex].columns.length === 0
            ? "add-disabled"
            : ""
        }`}
        onClick={() => openModal("add-task-modal")}>
        +
      </button>
      <img
        className="ellipsis"
        src={ellipsis}
        alt="vertical ellipsis"
        onClick={() => handleModal("options")}
      />
    </nav>
  )
}
