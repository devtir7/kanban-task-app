import React, { useContext } from 'react';
import Navbar from '../components/Navbar.jsx';
import Boards from '../components/Boards.jsx';
import BoardListModal from '../components/modals/BoardListModal.jsx';
import AddBoardModal from '../components/modals/AddBoardModal.jsx';
import EditBoardModal from '../components/modals/EditBoardModal.jsx';
import DeleteBoardModal from '../components/modals/DeleteBoardModal.jsx';
import BoardOptionsModal from '../components/modals/BoardOptionsModal.jsx';
import { TasksProvider } from '../contexts/TasksContext.jsx';
import { ModalContext } from '../contexts/ModalContext.jsx';
import { createPortal } from 'react-dom';

export default function App() {
  const { modal } = useContext(ModalContext);

  const modalComponents = {
    'list-board': <BoardListModal />,
    'add-board': <AddBoardModal />,
    'options-board': <BoardOptionsModal />,
    'edit-board': <EditBoardModal />,
    'delete-board': <DeleteBoardModal />,
  };

  return (
    <TasksProvider>
      <Navbar />
      <Boards />
      {modal.isOpen && modalComponents[modal.type]}
    </TasksProvider>
  );
}
