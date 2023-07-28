import { useState, useContext } from "react"

import Sidebar from "../components/Sidebar.jsx"
import Navbar from "../components/Navbar.jsx"
import Boards from "../components/Boards.jsx"

import BoardListModal from "../components/modals/BoardListModal.jsx"
import AddBoardModal from "../components/modals/AddBoardModal.jsx"
import EditBoardModal from "../components/modals/EditBoardModal.jsx"
import DeleteBoardModal from "../components/modals/DeleteBoardModal.jsx"
import BoardOptionsModal from "../components/modals/BoardOptionsModal.jsx"

import AddTaskModal from "../components/modals/AddTaskModal.jsx"
import ViewTaskModal from "../components/modals/ViewTaskModal.jsx"
import TaskOptionsModal from "../components/modals/TaskOptionsModal.jsx"
import EditTaskModal from "../components/modals/EditTaskModal.jsx"
import DeleteTaskModal from "../components/modals/DeleteTaskModal.jsx"

import { ModalContext } from "../contexts/ModalContext.jsx"
import { ThemeContext } from "../contexts/ThemeContext.jsx"

export default function App() {
  const { modal } = useContext(ModalContext)

  const { theme } = useContext(ThemeContext)

  const modalComponents = {
    "list-board": <BoardListModal theme={theme} />,
    "add-board": <AddBoardModal theme={theme} />,
    "options-board": <BoardOptionsModal theme={theme} />,
    "edit-board": <EditBoardModal theme={theme} />,
    "delete-board": <DeleteBoardModal theme={theme} />,
    "add-task-modal": <AddTaskModal theme={theme} />,
    "view-task-modal": <ViewTaskModal theme={theme} />,
    "options-task-modal": <TaskOptionsModal theme={theme} />,
    "edit-task-modal": <EditTaskModal theme={theme} />,
    "delete-task-modal": <DeleteTaskModal theme={theme} />,
  }

  const [sidebarHidden, setSidebarHidden] = useState(false)

  function handleSidebar() {
    setSidebarHidden(prev => !prev)
  }

  return (
    <>
      <div
        className={`${theme} grid-container ${
          sidebarHidden ? "hide-sidebar" : "show-sidebar"
        }`}>
        <Sidebar sidebarHidden={sidebarHidden} handleSidebar={handleSidebar} />
        <Navbar theme={theme} />
        <Boards sidebarHidden={sidebarHidden} handleSidebar={handleSidebar} />
      </div>
      {modal.isOpen && modalComponents[modal.type]}
    </>
  )
}
