import logoLight from "../assets/logo-light.svg"
import logoDark from "../assets/logo-dark.svg"
import ToggleSwitch from "./ToggleSwitch"
import boardIcon from "../assets/icon-board.svg"
import iconHideSidebar from "../assets/icon-hide-sidebar.svg"
import iconShowSidebar from "../assets/icon-show-sidebar.svg"

import { useContext, useState } from "react"
import { TasksContext } from "../contexts/TasksContext"
import { ThemeContext } from "../contexts/ThemeContext"
import { ModalContext } from "../contexts/ModalContext"

export default function Sidebar({ sidebarHidden, handleSidebar }) {
  const { theme } = useContext(ThemeContext)
  const { boardsData, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(TasksContext)
  const { openModal } = useContext(ModalContext)

  const boardsEl = boardsData?.map((board, index) => {
    return (
      <div key={board.id} className="modal-list-board-item">
        <div
          className={
            board === boardsData[selectedBoardIndex] ? "selectedBoard" : ""
          }>
          <img src={boardIcon} />
          <p className="heading-M" onClick={() => setSelectedBoardIndex(index)}>
            {board.name}
          </p>
          <br />
        </div>
      </div>
    )
  })

  return (
    // top section
    <div className="sidebar">
      <div className="kanban-logo">
        <img
          className="main-logo"
          src={theme === "light" ? logoDark : logoLight}
          alt="kanban logo"
        />
      </div>
      {!sidebarHidden && (
        <div className={`sidebar-content`}>
          <div className={`flex-container`}>
            <div className="boards-container">
              <div className="modal-list-header">
                <div className="modal-list-title">
                  ALL BOARDS ({boardsData?.length})
                </div>

                <div className="modal-list-boards">
                  {boardsEl}

                  <div className="modal-list-board-item mobile-add">
                    <div>
                      <img src={boardIcon} />
                      <p onClick={() => openModal("add-board")}>
                        + Create new Board
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="toggle-switch-container">
              <div className="modal-list-footer">
                <ToggleSwitch />
              </div>
              <div className="hide-button" onClick={handleSidebar}>
                <img src={iconHideSidebar} />
                <p className="hide-sidebar-text heading-M">Hide Sidebar</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
