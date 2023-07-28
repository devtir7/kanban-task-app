import { useContext } from "react"

import { TasksContext } from "../contexts/TasksContext"
import Task from "./Task"

import iconShowSidebar from "../assets/badge-show-sidebar.svg"

export default function Boards({ sidebarHidden, handleSidebar }) {
  const { boardsData, selectedBoardIndex } = useContext(TasksContext)

  return (
    <div className="boards">
      <Task
        key={boardsData[selectedBoardIndex].id}
        value={boardsData[selectedBoardIndex]}
      />

      {sidebarHidden && (
        <img
          className="show-sidebar-badge"
          src={iconShowSidebar}
          onClick={handleSidebar}
        />
      )}
    </div>
  )
}
