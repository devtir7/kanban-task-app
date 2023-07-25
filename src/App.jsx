import React, { useContext } from "react"
import Navbar from "../components/Navbar.jsx"
import Boards from "../components/Boards.jsx"
import BoardListModal from "../components/modals/BoardListModal.jsx"
import AddBoardModal from "../components/modals/AddBoardModal.jsx"
import EditBoardModal from "../components/modals/EditBoardModal.jsx"
import DeleteBoardModal from "../components/modals/DeleteBoardModal.jsx"
import BoardOptionsModal from "../components/modals/BoardOptionsModal.jsx"
import { TasksProvider } from "../contexts/TasksContext.jsx"
import { ModalContext } from "../contexts/ModalContext.jsx"
import AddTaskModal from "../components/modals/AddTaskModal.jsx"
import ViewTaskModal from "../components/modals/ViewTaskModal.jsx"
import TaskOptionsModal from "../components/modals/TaskOptionsModal.jsx"
import EditTaskModal from "../components/modals/EditTaskModal.jsx"
import DeleteTaskModal from "../components/modals/DeleteTaskModal.jsx"

export default function App() {
  const { modal } = useContext(ModalContext)

  const modalComponents = {
    "list-board": <BoardListModal />,
    "add-board": <AddBoardModal />,
    "options-board": <BoardOptionsModal />,
    "edit-board": <EditBoardModal />,
    "delete-board": <DeleteBoardModal />,
    "add-task-modal": <AddTaskModal />,
    "view-task-modal": <ViewTaskModal />,
    "options-task-modal": <TaskOptionsModal />,
    "edit-task-modal": <EditTaskModal />,
    "delete-task-modal": <DeleteTaskModal />,
  }

  return (
    <TasksProvider>
      <Navbar />
      <Boards />
      {modal.isOpen && modalComponents[modal.type]}
    </TasksProvider>
  )
}
