import {useState, useEffect, useContext} from "react"

import { TasksContext } from "../contexts/TasksContext"
import Task from "./Task"

export default function Boards() {
    const { boardsData, selectedBoardIndex } = useContext(TasksContext)

    return boardsData ? (
        <div className="boards">
            <Task
                key={boardsData[selectedBoardIndex].id}
                value={boardsData[selectedBoardIndex]}
            />

        </div>
    ) : (
        <div className="boards-empty">
            <p className="heading-L">This board is empty. Create a new column to get started.</p>
            <button className="button-primary-L">+ Add New Column</button>
        </div>
    )
}