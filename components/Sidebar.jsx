import ToggleSwitch from "./ToggleSwitch"
import boardIcon from "../assets/icon-board.svg"
import iconHideSidebar from "../assets/icon-hide-sidebar.svg"

import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"
import { ThemeContext } from "../contexts/ThemeContext"
import { ModalContext } from "../contexts/ModalContext"

export default function Sidebar({ sidebarHidden, handleSidebar }) {
  const { theme } = useContext(ThemeContext)
  const { boardsData, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(TasksContext)
  const { openModal } = useContext(ModalContext)

  const boardsEl = boardsData?.map((board, index) => {
    const selectedBoard =
      board === boardsData[selectedBoardIndex] ? "selected-board" : ""
    return (
      <div
        key={board.id}
        className={`modal-list-board-item ${selectedBoard}`}
        onClick={() => setSelectedBoardIndex(index)}>
        <img src={boardIcon} />
        <p className="heading-M">{board.name}</p>
        <br />
      </div>
    )
  })

  return (
    // top section
    <div className="sidebar">
      {!sidebarHidden && (
        <div className={`sidebar-content`}>
          <div className={`sidebar-boards`}>
            <div className="boards-container">
              <div className="modal-list-header">
                <div className="modal-list-title">
                  ALL BOARDS ({boardsData?.length})
                </div>

                <div className="modal-list-boards">
                  {boardsEl}

                  <div className="modal-list-board-item mobile-add">
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
            <ToggleSwitch />
            <div className="hide-button" onClick={handleSidebar}>
              <img src={iconHideSidebar} />
              <p className="hide-sidebar-text heading-M">Hide Sidebar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
