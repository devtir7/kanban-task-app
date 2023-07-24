import React, {useState, createContext} from "react"
import {nanoid} from "nanoid"
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

export default function TasksProvider({children}) {

    const [boardsData, setBoardsData] = useState(getBoards().map(item => {
        return {
            ...item,
            id: nanoid()
        }
    }))

    const [selectedBoardIndex, setSelectedBoardIndex] = useState(0)

    function addBoard(board) {
      setBoardsData(prev => {
        return [...prev, board]
      })
    }

    
  function editBoard(updatedBoard, index) {
    setBoardsData((prev) => {
      return prev.map((board, i) => {
        if (i === index) {
          return updatedBoard;
        } else {
          return board;
        }
      });
    });
  }

    function deleteBoard(boardIndex) {
      setBoardsData(prev => {
        return prev.filter(board => board.id != prev[boardIndex].id)
      })

      setSelectedBoardIndex(0)
    }

    React.useEffect(() => console.log(boardsData), [boardsData])

    return (
      <TasksContext.Provider
        value={{
          boardsData,
          addBoard,
          selectedBoardIndex,
          setSelectedBoardIndex,
          editBoard,
          deleteBoard
        }}
      >
        {children}
      </TasksContext.Provider>
    )
}

export {TasksContext, TasksProvider}