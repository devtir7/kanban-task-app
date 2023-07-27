import { useState, useEffect, useContext } from "react"

import { TasksContext } from "../contexts/TasksContext"
import Task from "./Task"

import iconShowSidebar from "../assets/badge-show-sidebar.svg"

export default function Boards({ sidebarHidden, handleSidebar }) {
  const { boardsData, selectedBoardIndex } = useContext(TasksContext)

  return (
    <div className="boards">
      <div className="boards-wrapper">
        <Task
          key={boardsData[selectedBoardIndex].id}
          value={boardsData[selectedBoardIndex]}
        />
      </div>

      {sidebarHidden && <img src={iconShowSidebar} onClick={handleSidebar} />}
    </div>
  )
}

// +--------+-----------+
// |         | NAVBAR    |
// + SIDEBAR |-----------+
// |         |           |
// +--------+-----------+
