import { useContext } from "react";
import mobileLogo from "../assets/logo-mobile.svg";
import downArrow from "../assets/icon-chevron-down.svg";
import upArrow from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import addTaskMobile from "../assets/add-task-mobile.svg";

import { TasksContext } from "../contexts/TasksContext";

import { ModalContext } from "../contexts/ModalContext";

export default function Navbar() {

    const { boardsData, selectedBoardIndex } = useContext(TasksContext)

    const { modal, openModal } = useContext(ModalContext)

    return (
            <nav>
                <img className="mobile-logo" src={mobileLogo} alt="kanban mobile logo" />
                <h1 onClick={() => openModal("list-board")}>{boardsData[selectedBoardIndex]?.name}</h1>
                
                <img src={modal.isOpen ? upArrow : downArrow} alt="arrow button to display all boards" />
                <img className="add-task-mobile" src={addTaskMobile} alt="button to add new task" />
                <img className="ellipsis" src={ellipsis} alt="vertical ellipsis" onClick={() => openModal("options-board")}/>
            </nav>
    )
}