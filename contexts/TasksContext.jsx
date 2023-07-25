import React, { useState, createContext } from "react"
import { nanoid } from "nanoid"
import data from "../data.json"

const TasksContext = createContext()

//this context needs to have all the relevant board-related functions that can then be passed to all other components

//this should store all of the data for each of the boards
//and have a function that detects when a new board has been selected
//and update the 'selectedID'
//and load the data for that board

function getBoards() {
  return data.boards
}

export default function TasksProvider({ children }) {
  const [boardsData, setBoardsData] = useState(
    getBoards().map(board => {
      return {
        ...board,
        id: nanoid(),
        columns: board.columns.map(column => {
          return {
            ...column,
            id: nanoid(),
            tasks: column.tasks.map(task => ({
              ...task,
              id: nanoid(),
            })),
          }
        }),
      }
    })
  )

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0)
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(0)
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0)

  function addBoard(board) {
    setBoardsData(prev => {
      return [...prev, board]
    })
  }

  function editBoard(updatedBoard, index) {
    setBoardsData(prev => {
      return prev.map((board, i) => {
        if (i === index) {
          return updatedBoard
        } else {
          return board
        }
      })
    })
  }

  function deleteBoard(boardIndex) {
    setBoardsData(prev => {
      return prev.filter(board => board.id != prev[boardIndex].id)
    })

    setSelectedBoardIndex(0)
  }

  function addTask(newTask, boardIndex) {
    setBoardsData(prevBoardsData => {
      const updatedBoardsData = [...prevBoardsData]
      const selectedBoard = updatedBoardsData[boardIndex]
      const columnIndex = selectedBoard.columns.findIndex(
        column => column.name.toLowerCase() === newTask.status.toLowerCase()
      )

      if (columnIndex !== -1) {
        selectedBoard.columns[columnIndex].tasks.push(newTask)
      }

      return updatedBoardsData
    })
  }

  const updateTaskStatus = (boardIndex, taskIndex, newStatus) => {
    setBoardsData(prevBoardsData => {
      const updatedBoardsData = [...prevBoardsData]
      const selectedBoard = updatedBoardsData[boardIndex]
      const selectedTask =
        selectedBoard.columns[selectedColumnIndex].tasks[taskIndex]

      // Remove the task from its current column
      const currentColumnIndex = selectedBoard.columns.findIndex(
        column =>
          column.name.toLowerCase() === selectedTask.status.toLowerCase()
      )
      selectedBoard.columns[currentColumnIndex].tasks.splice(taskIndex, 1)

      // Update the status of the selected task
      selectedTask.status = newStatus

      // Add the task to its new column
      const newColumnIndex = selectedBoard.columns.findIndex(
        column => column.name.toLowerCase() === newStatus.toLowerCase()
      )
      selectedBoard.columns[newColumnIndex].tasks.push(selectedTask)

      return updatedBoardsData
    })
  }

  function updateSubtaskStatus(
    boardIndex,
    colIndex,
    taskIndex,
    subtaskIndex,
    isCompleted
  ) {
    setBoardsData(prevBoardsData => {
      const updatedBoardsData = [...prevBoardsData]
      const selectedBoard = updatedBoardsData[boardIndex]
      const selectedTask = selectedBoard.columns[colIndex].tasks[taskIndex]

      const updatedSubtasks = selectedTask.subtasks.map((subtask, index) =>
        index === subtaskIndex ? { ...subtask, isCompleted } : subtask
      )

      selectedTask.subtasks = updatedSubtasks

      selectedBoard.columns[colIndex].tasks[taskIndex] = selectedTask

      updatedBoardsData[boardIndex] = selectedBoard

      return updatedBoardsData
    })
  }

  function editTask(updatedTask, boardIndex, colIndex, taskIndex) {
    setBoardsData(prevBoardsData => {
      const updatedBoardsData = [...prevBoardsData]
      updatedBoardsData[boardIndex].columns[colIndex].tasks[taskIndex] =
        updatedTask

      return updatedBoardsData
    })
  }

  function deleteTask(boardIndex, colIndex, taskIndex) {
    setBoardsData(prevBoardsData => {
      const updatedBoardsData = [...prevBoardsData]
      const selectedBoard = updatedBoardsData[boardIndex]
      const selectedColumn = selectedBoard.columns[colIndex]

      // Remove the task at the specified taskIndex from the column's tasks array
      selectedColumn.tasks.splice(taskIndex, 1)

      // Update the board's columns with the modified column
      selectedBoard.columns[colIndex] = selectedColumn

      // Update the board in the updatedBoardsData array
      updatedBoardsData[boardIndex] = selectedBoard

      return updatedBoardsData
    })
  }

  React.useEffect(() => console.log(boardsData), [boardsData])
  // React.useEffect(() => console.log(boardsData.columns), [boardsData.columns])

  return (
    <TasksContext.Provider
      value={{
        boardsData,
        addBoard,
        selectedBoardIndex,
        setSelectedBoardIndex,
        editBoard,
        deleteBoard,
        addTask,
        editTask,
        deleteTask,
        selectedTaskIndex,
        setSelectedTaskIndex,
        updateTaskStatus,
        updateSubtaskStatus,
        selectedColumnIndex,
        setSelectedColumnIndex,
      }}>
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
